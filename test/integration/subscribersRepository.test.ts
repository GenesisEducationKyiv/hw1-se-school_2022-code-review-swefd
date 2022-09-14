import { SubscriberModel } from "../../src/models/subscriber.model";

import * as chai from "chai";
const should = chai.should();
const MockFS = require("mock-fs");

import SubscribersRepository from "../../src/repository/subscribers.repository";

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
    const emails = SubscribersRepository.getAllEmails();
    emails.should.contain("test@mail.com");
  });

  it("should write emails to file", function () {
    const emailToWrite = "test1@mail.com";
    const subscriber = new SubscriberModel(emailToWrite);

    return SubscribersRepository.append(subscriber).then(() => {
      const emails = SubscribersRepository.getAllEmails();
      emails.should.contain(emailToWrite);
    });
  });
});
