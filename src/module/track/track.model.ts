import { model, Model, Schema } from "mongoose";
import MongooseHelper from "../../utility/mongoose.helpers";
import { IMedpro, IWeaponQualification } from "./track.interface";

// const isRequired = function (this: IAdmin): boolean {
//   return !(this.role === "Admin");
// };

const MedproSchema: Schema = new Schema<IMedpro>(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true}
);
const WeaponQualificationSchema: Schema =
  new Schema<IWeaponQualification>(
    MedproSchema,
    {
      name: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );
  

// MongooseHelper.excludeFields(AdminSchema, ["firstName", "lastName"], "Admin");
MongooseHelper.applyToJSONTransform(AdminSchema);
const Admin: Model<IAdmin> = model<IAdmin>("Admin", AdminSchema);
export default Admin;
