import { ISubscriberModel, SubscriberModel } from "../models/subscriber.model";

interface ISubscribersRepository {
  append(subscriber: SubscriberModel): any;
  includesEmail(email: string): Promise<boolean>;
  getAllSubscribers(): ISubscriberModel[];
  getAllEmails(): string[];
}

export { ISubscribersRepository };
