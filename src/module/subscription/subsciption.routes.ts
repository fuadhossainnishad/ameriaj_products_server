import express from "express";
import auth from "../../middleware/auth";
import SubscriptionController from "./subscription.controller";

const router = express.Router();

router
  .route("/")
  .post(auth("Admin"), SubscriptionController.createSubscription)
  .get(SubscriptionController.getSubscription)
  .patch(auth("Admin"), SubscriptionController.updateSubscription)
  .delete(auth("Admin"), SubscriptionController.deleteSubscription);

const SubscriptionRouter = router;
export default SubscriptionRouter;
