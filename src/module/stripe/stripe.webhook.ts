import httpStatus from "http-status";
import stripe from "../../app/config/stripe.config";
import { IWebhooks } from "./stripe.interface";
import config from "../../app/config";
import AppError from "../../app/error/AppError";
import Stripe from "stripe";

export const handleStripeWebhook = async (payload: IWebhooks) => {
  const { rawbody, sig } = payload;
  const event = stripe.webhooks.constructEvent(
    rawbody,
    sig!,
    config.stripe.webHookSecret!
  );
  if (!event || event.type !== "payment_intent.succeeded") {
    throw new AppError(httpStatus.NOT_FOUND, "not webhook event have found");
  }
  const paymentIntent = event.data.object as Stripe.PaymentIntent;

  if (!paymentIntent || paymentIntent.status !== "succeeded") {
    throw new AppError(httpStatus.NOT_FOUND, "No payment intent found");
  }

  return { paymentIntent }

  // const updateOrderStatus = await Subscription.findByIdAndUpdate(
  //   await idConverter(orderId),
  //   { status: "accept" },
  //   { new: true }
  // );
  // if (!updateOrderStatus) {
  //   throw new AppError(
  //     httpStatus.NOT_FOUND,
  //     "Order status not updated to accept due to some issue"
  //   );
  // }
};
