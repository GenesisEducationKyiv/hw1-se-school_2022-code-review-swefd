export interface ICustomerDTO {
  email: string;
}

export class CustomerDto implements ICustomerDTO {
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}
