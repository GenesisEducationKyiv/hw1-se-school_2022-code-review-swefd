const fs = require("fs");
const config = require("../../config/config.json");

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
}

module.exports = new SubscribeService();
