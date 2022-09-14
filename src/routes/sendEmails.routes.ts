import * as express from "express";
import SendEmailsController from "../controllers/sendEmails.controller";
const router = express.Router();

router.route("/").post(SendEmailsController.sendRateToAllSubscribers);

export default router;
