import * as express from "express";
import SubscribeController from "../controllers/subscribe.controller";
const router = express.Router();

router.route("/").post(SubscribeController.addEmail);

export default router;
