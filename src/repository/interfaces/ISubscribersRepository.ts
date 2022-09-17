import { ISubscriberModel } from "../../models/subscriber.model";

interface ISubscribersRepository {
  append(subscriber: ISubscriberModel): Promise<void>;
  includesEmail(email: string): Promise<boolean>;
  getAllSubscribers(): ISubscriberModel[];
  getAllEmails(): string[];
}

export { ISubscribersRepository };
