import SendEmailsService from "../services/sendEmails/sendEmails.service";
import httpErrors from "../http-responses/http-errors";
import { Request, Response } from "express";
import { HttpCode } from "../http-responses/http-code.enum";

class SendEmailsController {
  async sendRateToAllSubscribers(req: Request, res: Response) {
    const emailsPromises =
      await SendEmailsService.sendBtcUahRateToAllSubscribers();

    Promise.all(emailsPromises)
      .then((emails) => {
        const responseMessage = {
          message: "Emails sent successfully",
          info: emails,
        };

        res.status(HttpCode.OK).type("json").send(responseMessage);
      })
      .catch((error) => {
        if (error instanceof httpErrors.HttpError) {
          res.status(error.statusCode).type("json").send({
            message: error.message,
          });
        } else {
          // TODO: Add middleware error handler
          res.status(HttpCode.CONFLICT).send(error); // temp solution
        }
      });
  }
}

export default new SendEmailsController();
