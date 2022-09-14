import * as fs from "fs";
import HttpErrors from "../../http-responses/http-errors";
import SubscribersRepository from "../../repository/subscribers.repository";
import { SubscriberModel } from "../../models/subscriber.model";

class SubscribeService {
  // IDK where to move this func
  isEmailValid(email: string) {
    const emailValidationRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailValidationRule.test(email);
  }

  async subscribeEmail(email: string) {
    if (!this.isEmailValid(email)) {
      throw new HttpErrors.ConflictError("email is not valid");
    } else if (await SubscribersRepository.includesEmail(email)) {
      throw new HttpErrors.ConflictError("already subscribed");
    } else {
      SubscribersRepository.append(new SubscriberModel(email)).catch((err) => {
        throw new HttpErrors.TeapotError(
          "I'm a teapot :D \n Teapot can`t find the file"
        );
      });
    }
  }
}

export default new SubscribeService();
