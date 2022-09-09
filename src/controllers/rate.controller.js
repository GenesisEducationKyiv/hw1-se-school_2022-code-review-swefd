const RateService = require("../services/rate.service");

class RateController {
  async getRate(req, res) {
    RateService.getRate()
      .then((result) => {
        res.status(200).type("json").send({ rate: result });
      })
      .catch((err) => {
        res.status(409).send(err); // temp solution
      });
  }
}

module.exports = new RateController();
