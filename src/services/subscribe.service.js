const fs = require("fs");
const HttpErrors = require("../http-responses/http-errors");
const SubscribersRepository = require("../repository/subscribers.repository");

class SubscribeService {
  // idk where to move this func))
  isEmailValid(email) {
    const emailValidationRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailValidationRule.test(email);
  }

  async subscribeEmail(email) {
    if (!this.isEmailValid(email)) {
      throw new HttpErrors.ConflictError("email is not valid");
    } else if (await SubscribersRepository.includesEmail(email)) {
      throw new HttpErrors.ConflictError("already subscribed");
    } else {
      SubscribersRepository.append(email).catch((err) => {
        throw new HttpErrors.TeapotError(
          "I'm a teapot :D \n Teapot can`t find the file"
        );
      });
    }
  }
}

module.exports = new SubscribeService();
