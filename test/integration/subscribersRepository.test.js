const config = require("../../config/config.js");
const chai = require("chai");
const should = chai.should();

const MockFS = require("mock-fs");

const SubscribersRepository = require("../../src/repository/subscribers.repository");

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
    const emails = SubscribersRepository.getAll();
    emails.should.contain("test@mail.com");
  });

  it("should write emails to file", function () {
    const emailToWrite = "test1@mail.com";
    return SubscribersRepository.append(emailToWrite).then(() => {
      const emails = SubscribersRepository.getAll(config.db.path);
      emails.should.contain(emailToWrite);
    });
  });
});
