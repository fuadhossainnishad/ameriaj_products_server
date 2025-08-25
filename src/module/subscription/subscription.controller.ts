import httpStatus from "http-status";
import { RequestHandler } from "express";
import catchAsync from "../../utility/catchAsync";
import AppError from "../../app/error/AppError";
import sendResponse from "../../utility/sendResponse";
import GenericService from "../../utility/genericService.helpers";
import { idConverter } from "../../utility/idConverter";
import NotificationServices from "../notification/notification.service";
import Subscription from "./subscription.model";
import { ISubscription } from "./subscription.interface";
import User from "../user/user.model";
import StripeUtils from "../../utility/stripe.utils";
import { IUser } from "../user/user.interface";
import SubscriptionServices from "./subscription.services";
import StripeServices from "../stripe/stripe.service";

const createSubscription: RequestHandler = catchAsync(async (req, res) => {
  // if (req.user?.role !== "Admin") {
  //   throw new AppError(
  //     httpStatus.BAD_REQUEST,
  //     "Author ID is required",
  //     ""
  //   );
  // }
  const { name, description, price, interval } = req.body.data;
  if (!name || !description || price || interval) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Name, Description, price & interval are required",
      ""
    );
  }
  const stripeProductId = await StripeServices.createStripeProductId(name, description)
  const stripePriceId = await StripeServices.createStripePriceId({ ...req.body.data, stripeProductId })

  req.body.data = { ...req.body.data, stripePriceId }

  const result = await GenericService.insertResources<ISubscription>(
    Subscription,
    req.body?.data
  );

  // await NotificationServices.sendNoification({
  //   ownerId: req.user?._id,
  //   key: "notification",
  //   data: {
  //     id: result.Subsciption?._id.toString(),
  //     message: `New subsciption added`,
  //   },
  //   receiverId: [req.user?._id],
  // });



  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "successfully added new subscription",
    data: result,
  });
});

const getSubscription: RequestHandler = catchAsync(async (req, res) => {
  const { subscriptionId } = req.body.data;
  console.log("SubscriptionId: ", subscriptionId);

  if (!subscriptionId) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Subscription ID is required",
      ""
    );
  }
  const result = await GenericService.findResources<ISubscription>(
    Subscription,
    await idConverter(subscriptionId)
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "successfully retrieve all Subscription data",
    data: result,
  });
});

const getAllSubscription: RequestHandler = catchAsync(async (req, res) => {
  const result = await GenericService.findAllResources<ISubscription>(
    Subscription,
    req.query,
    ["title", "price"]
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "successfully retrieve Subscription data",
    data: result,
  });
});

const updateSubscription: RequestHandler = catchAsync(async (req, res) => {
  // if (!req.user) {
  //   throw new AppError(httpStatus.UNAUTHORIZED, "Admin not authenticated", "");
  // }
  const id = req?.params.id;

  // const id =
  //   typeof rawId === "string"
  //     ? rawId
  //     : Array.isArray(rawId) && typeof rawId[0] === "string"
  //       ? rawId[0]
  //       : undefined;

  const result = await GenericService.updateResources<ISubscription>(
    Subscription,
    await idConverter(id),
    req.body.data
  );

  // await NotificationServices.sendNoification({
  //   ownerId: req.user?._id,
  //   key: "notification",
  //   data: {
  //     id: result.subscription?._id.toString(),
  //     message: `An Subscription updated`,
  //   },
  //   receiverId: [req.user?._id],
  // });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "successfully updated Subscription ",
    data: result,
  });
});

const deleteSubscription: RequestHandler = catchAsync(async (req, res) => {
  if (!req.user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Admin not authenticated", "");
  }

  if (req.user?.role !== "Admin") {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Only admin can do update subscription",
      ""
    );
  }
  const { subscriptionId } = req.body.data;
  const result = await GenericService.deleteResources<ISubscription>(
    Subscription,
    await idConverter(subscriptionId)
  );

  await NotificationServices.sendNoification({
    ownerId: req.user?._id,
    key: "notification",
    data: {
      message: `An Subscription deleted`,
    },
    receiverId: [req.user?._id],
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "successfully deleted subscription",
    data: result,
  });
});

const TrialSubscription: RequestHandler = catchAsync(async (req, res) => {
  const { role, email, id, stripe_customer_id, } = req.user;
  if (role !== "User" || !email || !id) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Only valid user can have trial subscription",
      ""
    );
  }
  if (stripe_customer_id == "") {
    const customer_id = await StripeUtils.CreateCustomerId(email);
    req.user = await GenericService.updateResources<IUser>(User, id, { stripe_customer_id: customer_id })
  }
  const result = await SubscriptionServices.trialService<IUser>(req.user)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "successfully get trial subscription",
    data: result,
  });
})

const SubscriptionController = {
  createSubscription,
  getSubscription,
  getAllSubscription,
  updateSubscription,
  deleteSubscription,
  TrialSubscription
};

export default SubscriptionController;
