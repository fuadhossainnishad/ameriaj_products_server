import express from "express";
import auth from "../../middleware/auth";

import SettingsController from "./settings.controller";

const router = express.Router();

router
  .route("/")
  .get(SettingsController.getSettings)
  .put(SettingsController.upsertSettings);

const SettingsRouter = router;
export default SettingsRouter;
