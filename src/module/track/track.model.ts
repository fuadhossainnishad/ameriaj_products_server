import { model, Model, Schema } from "mongoose";
import MongooseHelper from "../../utility/mongoose.helpers";
import {
  IMedpro,
  IPhysicalFitness,
  IRangeQualification,
  ITrack,
  IWeaponQualification,
  TQualificationLevel,
} from "./track.interface";

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
  { timestamps: true }
);

const WeaponQualificationSchema: Schema = new Schema<IWeaponQualification>({
  pass: {
    type: Boolean,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
}).add(MedproSchema);

const PhysicalFitnessSchema: Schema = new Schema<IPhysicalFitness>({
  pass: {
    type: Boolean,
    required: true,
  },
}).add(MedproSchema);

const RangeQualificationSchema: Schema = new Schema<IRangeQualification>({
  qualificationLevel: Object.values(TQualificationLevel),
}).add(PhysicalFitnessSchema);

const CounselingSchema: Schema = new Schema({
  nextDate: {
    type: Date,
    required: true,
  },
  counseledBy: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    default: "",
  },
}).add(MedproSchema);

const AdminUserSchema: Schema = new Schema({
  lesCorrect: {
    type: Boolean,
    default: false,
  },
  vehicleRegistration: {
    type: String,
    default: "",
  },
  vehicleInsurance: {
    type: String,
    default: "",
  },
  educationMilitary: {
    type: String,
    default: "",
  },
  educationCivilian: {
    type: String,
    default: "",
  },
  volunteerHour: {
    type: Number,
    default: 0,
  },
}).add(MedproSchema);

const TrackSchema: Schema = new Schema({
  medpro: { type: MedproSchema, required: false },
  weaponQualification: { type: WeaponQualificationSchema, required: false },
  physicalFitness: { type: PhysicalFitnessSchema, required: false },
  rangeQualification: { type: RangeQualificationSchema, required: false },
  counseling: { type: CounselingSchema, required: false },
  adminUser: { type: AdminUserSchema, required: false },
});

// MongooseHelper.excludeFields(AdminSchema, ["firstName", "lastName"], "Admin");
MongooseHelper.applyToJSONTransform(TrackSchema);
const Track: Model<ITrack> = model<ITrack>("Track", TrackSchema);
export default Track;
