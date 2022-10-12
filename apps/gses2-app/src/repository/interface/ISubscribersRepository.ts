import { ISubscriberDTO } from '../dto/subscriber.dto';

const SUBSCRIBERS_REPOSITORY = 'SUBSCRIBERS_REPOSITORY';

interface ISubscribersRepository {
  append(subscriber: ISubscriberDTO): Promise<void>;

  delete(subscriber: ISubscriberDTO): boolean;

  includesEmail(email: string): Promise<boolean>;

  getAllSubscribers(): ISubscriberDTO[];

  getAllEmails(): string[];
}

export { ISubscribersRepository, SUBSCRIBERS_REPOSITORY };
