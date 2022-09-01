const express = require("express");
const router = express.Router();
const RateController = require("../controllers/rate.controller");

router.route("/").get(RateController.getRate);

module.exports = router;
