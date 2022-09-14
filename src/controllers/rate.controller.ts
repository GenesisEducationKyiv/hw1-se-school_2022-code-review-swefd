import RateService from "../services/rate/rate.service";

class RateController {
  async getRate(req: any, res: any) {
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
