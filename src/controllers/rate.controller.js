const RateService = require("../services/rate.service");

class RateController {
  async getRate(req, res) {
    await RateService.getRate()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(409).send(err);
      });
  }
}

module.exports = new RateController();
