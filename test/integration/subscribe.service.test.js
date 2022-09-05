const config = require("../../config/config.js");
const chai = require("chai");
const should = chai.should();

const MockFS = require("mock-fs");

const SubscribeService = require("../../src/services/subscribe.service");

describe("db.txt file R/W", () => {
  before(() => {
    MockFS({
      src: {
        models: {
          "db.txt": "test@mail.com" + "\n",
        },
      },
    });
  });

  after(() => {
    MockFS.restore();
  });

  it("should read emails from file", function () {
    return SubscribeService.readEmailsFromFile().then((email) => {
      email.should.contain("test@mail.com");
    });
  });

  it("should write emails to file", function () {
    const emailToWrite = "test1@mail.com";
    return SubscribeService.addEmailToFile(emailToWrite).then(() => {
      return SubscribeService.readEmailsFromFile(config.db.path).then(
        (email) => {
          email.should.contain(emailToWrite);
        }
      );
    });
  });
});
