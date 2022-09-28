import { Injectable } from '@nestjs/common';
import { SubscriberDTO } from '../../repository/dto/subscriber.dto';
import { SubscribersRepository } from '../../repository/service/repository.service';

@Injectable()
export class SubscriptionService {
  constructor(private repository: SubscribersRepository) {}

  public async addNewEmail(email: string) {
    try {
      if (!(await this.repository.includesEmail(email))) {
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
