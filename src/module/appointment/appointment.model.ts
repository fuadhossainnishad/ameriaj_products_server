import { model, Model, Schema } from "mongoose";
import { IAppointment } from "./appointment.interface";
import MongooseHelper from "../../utility/mongoose.helpers";
import { dateRegex, timeRegex } from "../../constants/regex.constants";

const AppointmentSchema: Schema = new Schema<IAppointment>(
  {
    dateTime: {
      type: Date,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

MongooseHelper.findExistence<IAppointment>(AppointmentSchema);
MongooseHelper.applyToJSONTransform(AppointmentSchema);

const Appointment: Model<IAppointment> = model<IAppointment>(
  "Appointment",
  AppointmentSchema
);
export default Appointment;
