import { Inject, Injectable } from '@nestjs/common';
import { SubscriberDTO } from '../../repository/dto/subscriber.dto';
import {
  ISubscribersRepository,
  SUBSCRIBERS_REPOSITORY,
} from '../../repository/interface/ISubscribersRepository';

@Injectable()
export class SubscriptionService {
  constructor(
    @Inject(SUBSCRIBERS_REPOSITORY) private repository: ISubscribersRepository,
  ) {}

  public async addNewEmail(email: string) {
    try {
      const includesEmail = await this.repository.includesEmail(email);
      if (includesEmail) {
        await this.repository.append(new SubscriberDTO(email));
        return 'Email successfully subscribed';
      } else {
        return 'This email already exist';
      }
    } catch (error) {
      console.log(error);
      throw new Error(
        `Error occurred while creating new subscription': ${error.message}`,
      );
    }
  }
}
