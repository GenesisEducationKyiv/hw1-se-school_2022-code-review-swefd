export interface ISubscriberDTO {
  email: string;
}

export class SubscriberDTO implements ISubscriberDTO {
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}
