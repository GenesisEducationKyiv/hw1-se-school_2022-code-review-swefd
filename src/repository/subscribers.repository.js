const fs = require("fs");
const config = require("../../config/config");

class SubscribersRepository {
  append(email) {
    return fs.promises.appendFile(
      process.cwd() + config.db.path,
      "\n" + email,
      { encoding: "utf8" }
    );
  }

  async includesEmail(email) {
    const emails = this.getAll();
    return emails.includes(email);
  }

  getAll() {
    return fs.readFileSync(process.cwd() + config.db.path, "utf-8").split("\n");
  }
}

module.exports = new SubscribersRepository();
