import config from "../../config/config";
import * as nodemailer from "nodemailer";
//import * as SibApiV3Sdk from "sib-api-v3-typescript";
const SibApiV3Sdk = require("sib-api-v3-typescript");
import * as fs from "fs";
import RateService from "../rate/rate.service";
import HttpErrors from "../../http-responses/http-errors";
import SubscribersRepository from "../../repository/subscribers.repository";
import { Options } from "nodemailer/lib/smtp-connection";

// // @ts-ignore
// SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
//   config.mail.API_KEY;

let apiInstance = new SibApiV3Sdk.AccountApi();

apiInstance.setApiKey(
  SibApiV3Sdk.AccountApiApiKeys.apiKey,
  config.mail.API_KEY
);

class EmailsService {
  getMailTransporter() {
    const mailOptions: Options = {
      host: config.mailTrap.host,
      port: Number(config.mailTrap.port),
      auth: {
        user: config.mailTrap.user,
        pass: config.mailTrap.pass,
      },
    };

    return nodemailer.createTransport(mailOptions);
  }

  /*
   * FIXME: sendFakeEmail
   *  use bulk sending instead of promises
   *  transporter.sendMail() method can send same message to many addresses
   */
  sendFakeEmail(mailOptions: any) {
    const transporter = this.getMailTransporter();
    return transporter.sendMail(mailOptions);
  }

  async sendBtcUahRateToAllSubscribers() {
    const Promises = await RateService.getRate()
      .then((rate) => {
        const subscribedEmails = SubscribersRepository.getAllSubscribers();
        let emailsSendPromises: any[] = [];
        subscribedEmails.forEach((subscriber) => {
          if (config.app.fakeSMTP === "true") {
            const mailOptions = {
              from: config.mailTrap.from,
              to: subscriber.email,
              subject: config.mailTrap.subject,
              text: `Current BTC/UAH rate is ${rate} (Binance)`,
            };
            // FIXME: SendFakeEmail change promises to bulk Send
            emailsSendPromises.push(this.sendFakeEmail(mailOptions));
          } else {
            const emailDetails = this.createEmail(
              "gses2app@mail.com",
              "GSES APP",
              config.mailTrap.subject,
              `Current BTC/UAH Rate: ${rate}`,
              subscriber.email
            );
            this.sendRealEmail(emailDetails);
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

  createEmail(
    senderAddress: string,
    senderName: string,
    subject: string,
    textContent: string,
    recipientEmail: string
  ) {
    return {
      sender: { email: senderAddress, name: senderName },
      subject: subject,
      textContent: textContent,
      to: [{ email: recipientEmail }],
    };
  }

  sendRealEmail(emailDetails: any) {
    new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(emailDetails);
  }
}

export default new EmailsService();
