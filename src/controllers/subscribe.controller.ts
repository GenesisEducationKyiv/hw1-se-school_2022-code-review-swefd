import SubscribeService from "../services/subscribe/subscribe.service";
import httpErrors from "../http-responses/http-errors";
import { Request, Response } from "express";
import { HttpCode } from "../http-responses/http-code.enum";

class SubscribeController {
  async addEmail(req: Request, res: Response) {
    const reqEmail = req.body.email.toLowerCase();

    SubscribeService.subscribeEmail(reqEmail)
      .then(() => {
        res
          .status(HttpCode.OK)
          .type("json")
          .send({ message: `${reqEmail} successfully subscribed` });
      })
      .catch((error) => {
        if (error instanceof httpErrors.HttpError) {
          res.status(error.statusCode).type("json").send({
            message: error.message,
          });
        } else {
          res.status(HttpCode.CONFLICT).send(error); // temp solution
        }
      });
  }
}

export default new SubscribeController();
