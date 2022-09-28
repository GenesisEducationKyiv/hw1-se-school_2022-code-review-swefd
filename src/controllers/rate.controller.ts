import RateService from "../services/rate/rate.service";
import { Request, Response } from "express";
import { HttpCode } from "../http-responses/http-code.enum";

class RateController {
  async getRate(req: Request, res: Response) {
    RateService.getRate()
      .then((result: any) => {
        res.status(HttpCode.OK).type("json").send({ rate: result });
      })
      .catch((err: any) => {
        res.status(HttpCode.CONFLICT).send(err); // temp solution
      });
  }
}

export default new RateController();
