const SubscribeService = require("../services/subscribe.service");
const httpErrors = require("../http-responses/http-errors");

class SubscribeController {
  async addEmail(req, res) {
    const reqEmail = req.body.email.toLowerCase();

    SubscribeService.subscribeEmail(reqEmail)
      .then(() => {
        res
          .status(200)
          .type("json")
          .send({ message: `${reqEmail} successfully subscribed` });
      })
      .catch((error) => {
        if (error instanceof httpErrors.HttpError) {
          res.status(error.statusCode).type("json").send({
            message: error.message,
          });
        } else {
          res.status(409).send(error); // temp solution
        }
      });
  }
}

module.exports = new SubscribeController();
