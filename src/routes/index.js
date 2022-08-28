const express = require("express");
const router = express.Router();
const rateRoutes = require("./rate.routes");
const subscribeRoutes = require("./subscribe.routes");
const sendEmailsRoutes = require("./sendEmails.routes");

router.use("/rate", rateRoutes);
router.use("/subscribe", subscribeRoutes);
router.use("/sendEmails", sendEmailsRoutes);

module.exports = router;
