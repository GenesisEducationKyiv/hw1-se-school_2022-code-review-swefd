const SendEmailsService = require("../services/sendEmails.service");
const httpErrors = require("../http-responses/http-errors");

class SendEmailsController {
  async sendRateToAllSubscribers(req, res) {
    const emailsPromises =
      await SendEmailsService.sendBtcUahRateToAllSubscribers();

    Promise.all(emailsPromises)
      .then((emails) => {
        const responseMessage = {
          message: "Emails sent successfully",
          info: emails,
        };

        res.status(200).type("json").send(responseMessage);
      })
      .catch((error) => {
        if (error instanceof httpErrors.HttpError) {
          res.status(error.statusCode).type("json").send({
            message: error.message,
          });
        } else {
          throw error;
        }
      });
  }
}

module.exports = new SendEmailsController();
