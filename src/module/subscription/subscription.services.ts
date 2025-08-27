import httpStatus from 'http-status';
// import httpStatus from "http-status";
// import AppError from "../../app/error/AppError";
// import { idConverter } from "../../utility/idConverter";
// import Insurance from "./subscription.model";

import AppError from "../../app/error/AppError";
import { IUser } from "../user/user.interface";
import StripeServices from '../stripe/stripe.service';
import stripe from '../../app/config/stripe.config';

// const updateSubscriptionService = async (payload: TInsuranceUpdate) => {
//   const { insuranceId, ...updateData } = payload;
//   const insuranceIdObject = await idConverter(insuranceId);

//   if (!insuranceIdObject) {
//     throw new AppError(httpStatus.NOT_FOUND, "Insurance id is required");
//   }
//   const foundInsurance = await Insurance.findById(insuranceIdObject);
//   if (!foundInsurance) {
//     throw new AppError(httpStatus.NOT_FOUND, "No insurance has found");
//   }

//   Object.assign(foundInsurance, updateData);
//   foundInsurance.save();
//   return { insurance: foundInsurance };
// };



const trialService = async <T extends IUser>(payload: T) => {
    const { subscriptionPlan } = payload;
    if (subscriptionPlan.trialUsed === true) {
        throw new AppError(httpStatus.EXPECTATION_FAILED, "Trial have used try paid one")
    }
const freeTrial = await StripeServices.createSubscription(payload)

}
const SubscriptionServices = {
    trialService
};

export default SubscriptionServices