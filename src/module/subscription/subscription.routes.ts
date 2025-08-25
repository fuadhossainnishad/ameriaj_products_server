import express from "express";
import auth from "../../middleware/auth";
import SubscriptionController from "./subscription.controller";

const router = express.Router();

router
  .route("/")
  .post(SubscriptionController.createSubscription)
  .get(SubscriptionController.getAllSubscription)
  .delete(auth("Admin"), SubscriptionController.deleteSubscription);

router.patch("/:id", SubscriptionController.updateSubscription);

const SubscriptionRouter = router;
export default SubscriptionRouter;
