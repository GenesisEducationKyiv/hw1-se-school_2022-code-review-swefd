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
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      throw new Error(
        `Error occurred while creating new subscription': ${error.message}`,
      );
    }
  }

  public removeEmail(email: string) {
    this.repository.delete(new SubscriberDTO(email));
  }
}
