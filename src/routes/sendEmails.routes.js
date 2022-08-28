const express = require("express"),
  router = express.Router(),
  SendEmailsController = require("../controllers/sendEmails.controller");

router.route("/").post(SendEmailsController.sendRateToAllSubscribers);

module.exports = router;
