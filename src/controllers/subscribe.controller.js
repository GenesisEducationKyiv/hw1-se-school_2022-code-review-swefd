const SubscribeService = require("../services/subscribe.service");

class SubscribeController {
  async addEmail(req, res) {
    const reqEmail = req.body.email.toLowerCase();

    SubscribeService.readEmailsFromFile()
      .then((result) => {
        const emails = toString(result)
          .split(/\r?\n/)
          .filter((element) => element);
        if (emails.includes(reqEmail)) {
          res
            .status(409)
            .type("json")
            .send(
              JSON.stringify({ message: `${reqEmail} already subscribed` })
            );
        } else {
          SubscribeService.addEmailToFile(reqEmail)
            .then(() => {
              res
                .status(200)
                .type("json")
                .send({ message: `${reqEmail} successfully subscribed` });
            })
            .catch((err) => {
              console.error(err);
              res
                .status(418)
                .type("json")
                .send(
                  JSON.stringify({
                    message: "I'm a teapot :D \n Teapot can`t find the file",
                  })
                );
            });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(418);
        res.send(
          JSON.stringify({
            message: "I'm a teapot :D \n Teapot can`t find the file",
          })
        );
      });
  }
}

module.exports = new SubscribeController();
