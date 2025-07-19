import { Types } from "mongoose";
import { IAdmin } from "../admin/admin.interface";
import { ISignup } from "../auth/auth.interface";

export interface SubscriptionPlan {
  trial: boolean;
  trialUsed: boolean;
  id: Types.ObjectId;
  start: Date;
  end: Date;
  isActive: boolean;
}

export interface IUser extends ISignup, IAdmin {
  uic: string;
  rank: string;
  subscriptionPlan: SubscriptionPlan;
}

export type TUserUpdate = Partial<IUser> & {
  userId: string;
};
