import SendEmailsService from "../services/sendEmails/sendEmails.service";
import httpErrors from "../http-responses/http-errors";

class SendEmailsController {
  async sendRateToAllSubscribers(req: any, res: any) {
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
          // TODO: Add middleware error handler
          res.status(409).send(error); // temp solution
        }
      });
  }
}

export default new SendEmailsController();
