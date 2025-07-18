import { model, Model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import MongooseHelper from "../../utility/mongoose.helpers";
import { Role } from "../auth/auth.interface";

// Helpers
const isRequired = function (this: IUser): boolean {
  return !!this.firstName;
};

// const isRequiredForSocial = function (this: IUser): boolean {
//   return !!this.sub;
// };

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
    userName: {
      type: String,
      default: function (this: IUser): string {
        if (this.role === "User") return this.firstName + " " + this.lastName;
        return "";
      },
    },
    password: {
      type: String,
      required: isRequired,
    },
    confirmedPassword: {
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
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exist"],
    },
    role: {
      type: String,
      enum: Role,
      required: [true, "Role is required"],
    },
    passwordUpdatedAt: {
      type: Date,
      default: Date.now,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Attach Mongoose Helpers
MongooseHelper.preSaveHashPassword(UserSchema);
MongooseHelper.comparePasswordIntoDb(UserSchema);
MongooseHelper.findExistence<IUser>(UserSchema);
MongooseHelper.applyToJSONTransform(UserSchema);

// Export Model
const User: Model<IUser> = model<IUser>("User", UserSchema);
export default User;
