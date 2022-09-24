import * as chai from "chai";
const should = chai.should();

import SubscribeService from "../../src/services/subscribe/subscribe.service";

describe("Email validation function isEmailValid()", () => {
  it("should return true for valid email", (done) => {
    const res = SubscribeService.isEmailValid("test@mail.com");
    res.should.be.true;
    done();
  });

  it("should return true for invalid email", (done) => {
    const res = SubscribeService.isEmailValid("test@mail");
    res.should.be.false;
    done();
  });

  it("should return true for invalid email", (done) => {
    const res = SubscribeService.isEmailValid("test@@mail.com");
    res.should.be.false;
    done();
  });
});
