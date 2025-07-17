import { model, Model, Schema } from "mongoose";
import { ISubscription, TBillingCycle } from "./subscription.interface";
import MongooseHelper from "../../utility/mongoose.helpers";

const SubscriptionSchema: Schema = new Schema<ISubscription>(
  {
    subscriptionName: {
      type: String,
      required: true,
    },
    billingCycle: {
      type: String,
      enum: Object.values(TBillingCycle),
      required: true,
    },
    shortDescription: [
      {
        type: String,
        required: true,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

MongooseHelper.findExistence<ISubscription>(SubscriptionSchema);
MongooseHelper.applyToJSONTransform(SubscriptionSchema);

const Subscription: Model<ISubscription> = model<ISubscription>(
  "Subscription",
  SubscriptionSchema
);
export default Subscription;
