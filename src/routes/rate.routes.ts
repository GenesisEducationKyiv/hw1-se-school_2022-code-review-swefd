import * as express from "express";
const router = express.Router();
import RateController from "../controllers/rate.controller";

router.route("/").get(RateController.getRate);

export default router;
