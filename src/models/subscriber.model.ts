interface ISubscriberModel {
  email: string;
}

class SubscriberModel implements ISubscriberModel {
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}

export { ISubscriberModel, SubscriberModel };
