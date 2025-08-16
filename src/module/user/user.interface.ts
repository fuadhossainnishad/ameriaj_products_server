import { Types } from "mongoose";
import { IAdmin } from "../admin/admin.interface";
import { ISignup } from "../auth/auth.interface";

export interface ITrial {
  active: boolean;
  length: number;
  start: Date;
  end: Date;
}

export interface IPaid extends ITrial {
  subscriptionId: Types.ObjectId;
}
export interface SubscriptionPlan {
  trial: ITrial;
  trialUsed: boolean;
  paid: IPaid;
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
