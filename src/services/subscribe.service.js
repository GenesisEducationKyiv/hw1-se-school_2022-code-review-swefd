const fs = require("fs");
const HttpErrors = require("../http-responses/http-errors");

const config = require("../../config/config.js");

class SubscribeService {
  readEmailsFromFile() {
    return fs.promises.readFile(process.cwd() + config.db.path, {
      encoding: "utf8",
    });
  }

  addEmailToFile(email) {
    return fs.promises.appendFile(
      process.cwd() + config.db.path,
      "\n" + email,
      { encoding: "utf8" }
    );
  }

  async isEmailAlreadySubscribed(email) {
    return await this.readEmailsFromFile().then((result) => {
      const emails = result.split(/\r?\n/).filter((element) => element);
      return emails.includes(email);
    });
  }

  async subscribeEmail(email) {
    if (await this.isEmailAlreadySubscribed(email)) {
      throw new HttpErrors.ConflictError("already subscribed");
    } else {
      this.addEmailToFile(email).catch((err) => {
        console.error(err);
        throw new HttpErrors.TeapotError(
          "I'm a teapot :D \n Teapot can`t find the file"
        );
      });
    }
  }
}

module.exports = new SubscribeService();
