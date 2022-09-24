import RateService from "../services/rate/rate.service";
import { Request, Response } from "express";

class RateController {
  async getRate(req: Request, res: Response) {
    RateService.getRate()
      .then((result: any) => {
        res.status(200).type("json").send({ rate: result });
      })
      .catch((err: any) => {
        res.status(409).send(err); // temp solution
      });
  }
}

export default new RateController();
