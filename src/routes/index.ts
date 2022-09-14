import * as express from "express";
const router = express.Router();

import rateRoutes from "./rate.routes";
import subscribeRoutes from "./subscribe.routes";
import sendEmailsRoutes from "./sendEmails.routes";

router.use("/rate", rateRoutes);
router.use("/subscribe", subscribeRoutes);
router.use("/sendEmails", sendEmailsRoutes);

export default router;
