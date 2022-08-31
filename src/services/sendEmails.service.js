const config = require("../../config/config.json");
const nodemailer = require("nodemailer");
const SibApiV3Sdk = require("sib-api-v3-sdk");
const fs = require("fs");
const RateService = require("./rate.service");
const HttpErrors = require("../http-responses/http-errors");

SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
  config.mail.API_KEY;

class EmailsService {
  getMailTransporter() {
    return nodemailer.createTransport({
      host: config.mailTrap.host,
      port: config.mailTrap.port,
      auth: {
        user: config.mailTrap.user,
        pass: config.mailTrap.pass,
      },
    });
  }

  getSubscribersEmails() {
    return fs.readFileSync(process.cwd() + config.db.path, "utf-8").split("\n");
  }

  sendFakeEmail(mailOptions) {
    const transporter = this.getMailTransporter();
    return transporter.sendMail(mailOptions);
  }

  //generateRealEmail() {}

  async sendBtcUahRateToAllSubscribers() {
    const Promises = await RateService.getRate()
      .then((rate) => {
        const subscribedEmails = this.getSubscribersEmails();
        let emailsSendPromises = [];
        subscribedEmails.forEach((emailAddress) => {
          if (config.app.fakeSMTP === "true") {
            const mailOptions = {
              from: config.mailTrap.from,
              to: emailAddress,
              subject: config.mailTrap.subject,
              text: `Current BTC/UAH rate is ${rate} (Binance)`,
            };
            emailsSendPromises.push(this.sendFakeEmail(mailOptions));
          } else {
            this.sendRealEmail(emailAddress, rate);
          }
        });
        return emailsSendPromises;
      })
      .catch((err) => {
        console.log(err);
        throw new HttpErrors.ServiceUnavailableError("Can't get Rate");
      });

    return Promises;
  }

  sendRealEmail(emailAddress, rate) {
    new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
      sender: { email: "gses2app@mail.com", test: "Test Name" },
      subject: config.mailTrap.subject,
      textContent: `Current BTC/UAH Rate: ${rate}`,
      to: [{ email: emailAddress }],
    });
  }
}

module.exports = new EmailsService();
