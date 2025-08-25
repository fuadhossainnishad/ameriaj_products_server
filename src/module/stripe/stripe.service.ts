import httpStatus from "http-status";
import stripe from "../../app/config/stripe.config";
import AppError from "../../app/error/AppError";
import { IPaymentIntent } from "./stripe.interface";
import { ISubscription } from "../subscription/subscription.interface";
import { IUser } from "../user/user.interface";

const createPaymentIntentService = async (payload: IPaymentIntent) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: payload.amount,
    currency: payload.currency || "usd",
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      subscriptionId: payload.subscriptionId,
      userId: payload.userId,
    },
  });
  if (!paymentIntent) {
    throw new AppError(
      httpStatus.NOT_IMPLEMENTED,
      "There is a problem on payment building"
    );
  }
  return { clientSecret: paymentIntent.client_secret };
};

const createStripeProductId = async (name: string, description: string): Promise<string> => {
  const product = await stripe.products.create({
    name,
    description
  })
  if (!product || !product.id) {
    throw new AppError(httpStatus.BAD_REQUEST, "Something error happened, try again later")

  }
  return product.id
}

const createStripePriceId = async (payload: ISubscription): Promise<string> => {
  const { price, interval, stripeProductId } = payload
  const stripe_price = await stripe.prices.create({
    unit_amount: price * 1000,
    currency: 'usd',
    recurring: { interval: interval },
    product: stripeProductId
  })
  if (!stripe_price || !stripe_price.id) {
    throw new AppError(httpStatus.BAD_REQUEST, "Something error happened, try again later")

  }
  return stripe_price.id
}

const createSubscription = async (payload: IUser) => {
  const stripeSubscription = await stripe.subscriptions.create({
    customer: payload.stripe_customer_id,
    items: [],
    trial_end: Math.floor(trialEnd.getTime() / 1000),  // Set trial end date
    metadata: { userId: user._id.toString() },
  })
}

const StripeServices = {
  createPaymentIntentService,
  createStripeProductId,
  createStripePriceId
};
export default StripeServices;
