const config = require("../../config/config.json");
const SendEmailsService = require("../services/sendEmails.service");
const RateService = require("../services/rate.service");

class SendEmailsController {
  async sendRateToAllSubscribers(req, res) {
    RateService.getRate()
      .then((rate) => {
        const subscribedEmails = SendEmailsService.getSubscribersEmails();
        subscribedEmails.forEach((emailAddress) => {
          if (config.app.fakeSMTP === "true") {
            console.log(config.app.fakeSMTP);
            const mailOptions = {
              from: config.mailTrap.from,
              to: emailAddress,
              subject: config.mailTrap.subject,
              text: `Current BTC/UAH rate is ${rate} (Binance)`,
            };
            SendEmailsService.sendFakeEmail(mailOptions);
          } else {
            SendEmailsService.sendRealEmail(emailAddress, rate);
          }
        });
        const responseMessage = {
          message: "Emails sent successfully",
          emailAddress: subscribedEmails,
        };
        res.status(200).type("json").send(responseMessage);
      })
      .catch((err) => {
        res.status(503).send(err);
        console.error(err);
      });
  }
}

module.exports = new SendEmailsController();
