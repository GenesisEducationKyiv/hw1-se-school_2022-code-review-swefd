const fs = require("fs");
const HttpErrors = require("../http-responses/http-errors");

const config = require("../../config/config.js");

class SubscribeService {
  // TODO: Move to repository
  readEmailsFromFile() {
    return fs.promises.readFile(process.cwd() + config.db.path, {
      encoding: "utf8",
    });
  }
  // TODO: Move to repository
  addEmailToFile(email) {
    return fs.promises.appendFile(
      process.cwd() + config.db.path,
      "\n" + email,
      { encoding: "utf8" }
    );
  }

  isEmailValid(email) {
    const emailValidationRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailValidationRule.test(email);
  }

  async isEmailAlreadySubscribed(email) {
    return await this.readEmailsFromFile().then((result) => {
      const emails = result.split(/\r?\n/).filter((element) => element);
      return emails.includes(email);
    });
  }

  async subscribeEmail(email) {
    if (!this.isEmailValid(email)) {
      throw new HttpErrors.ConflictError("email is not valid");
    } else if (await this.isEmailAlreadySubscribed(email)) {
      throw new HttpErrors.ConflictError("already subscribed");
    } else {
      this.addEmailToFile(email).catch((err) => {
        throw new HttpErrors.TeapotError(
          "I'm a teapot :D \n Teapot can`t find the file"
        );
      });
    }
  }
}

module.exports = new SubscribeService();
