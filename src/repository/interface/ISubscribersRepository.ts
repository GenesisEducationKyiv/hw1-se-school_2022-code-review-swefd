import { ISubscriberDTO } from '../dto/subscriber.dto';

interface ISubscribersRepository {
  append(subscriber: ISubscriberDTO): Promise<void>;
  includesEmail(email: string): Promise<boolean>;
  getAllSubscribers(): ISubscriberDTO[];
  getAllEmails(): string[];
}

export { ISubscribersRepository };
