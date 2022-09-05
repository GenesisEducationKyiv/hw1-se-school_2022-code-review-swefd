const chai = require("chai");
const should = chai.should();

const SubscribeService = require("../../src/services/subscribe.service");

describe("Email validation function isEmailValid()", () => {
  it("should return true (test@mail.com)", (done) => {
    const res = SubscribeService.isEmailValid("test@mail.com");
    res.should.be.true;
    done();
  });

  it("should return false (test@mail)", (done) => {
    const res = SubscribeService.isEmailValid("test@mail");
    res.should.be.false;
    done();
  });

  it("should return false (test@@mail.com)", (done) => {
    const res = SubscribeService.isEmailValid("test@@mail.com");
    res.should.be.false;
    done();
  });
});
