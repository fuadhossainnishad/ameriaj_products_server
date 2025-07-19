import { Model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import MongooseHelper from "../../utility/mongoose.helpers";
import Admin from "../admin/admin.model";

// Helpers
const isRequired = function (this: IUser): boolean {
  return !!this.firstName;
};

const isPlanRequired = function (this: IUser): boolean {
  return !this.trial;
};

// Schema
export const UserSchema: Schema = new Schema<IUser>(
  {
    // sub: {
    //   type: String,
    //   required: false,
    // },
    // authProviderName: {
    //   type: String,
    //   required: isRequiredForSocial,
    // },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: isRequired,
    },
    mobile: {
      type: String,
      required: isRequired,
    },
    countryCode: {
      type: String,
      required: isRequired,
    },
    uic: {
      type: String,
      default: "",
    },
    rank: {
      type: String,
      default: "",
    },
    subscriptionPlan: {
      trial: {
        type: Boolean,
        required: true,
      },
      trialUsed: {
        type: Boolean,
        default: function (this: IUser): boolean {
          return this.subscriptionPlan.start.getTime() < Date.now();
        },
        id: {
          type: Schema.Types.ObjectId,
          ref: "Subscription",
          required: function (this: IUser): boolean {
            return this.subscriptionPlan.trialUsed;
          },
        },
        start: {
          type: Date,
          required: true,
        },
        end: {
          type: Date,
          dafault: true,
        },
        isActive: {
          type: Boolean,
          default: true,
        },
      },
    },
  },
  { timestamps: true, collection: "Users" }
);

// Attach Mongoose Helpers
MongooseHelper.preSaveHashPassword(UserSchema);
MongooseHelper.preSaveConjugate<IUser>(UserSchema);
MongooseHelper.comparePasswordIntoDb(UserSchema);
MongooseHelper.findExistence<IUser>(UserSchema);
MongooseHelper.applyToJSONTransform(UserSchema);

// Export Model
const User: Model<IUser> = Admin.discriminator<IUser>("User", UserSchema);
export default User;
