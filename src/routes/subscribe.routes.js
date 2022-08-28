const express = require("express"),
  router = express.Router(),
  SubscribeController = require("../controllers/subscribe.controller");

router.route("/").post(SubscribeController.addEmail);

module.exports = router;
