import { ICustomerDTO } from '../dto/customer.dto';

const CUSTOMERS_REPOSITORY = 'CUSTOMERS_REPOSITORY';

interface ICustomersRepository {
  append(subscriber: ICustomerDTO): Promise<void>;

  delete(subscriber: ICustomerDTO): boolean;

  includesEmail(email: string): Promise<boolean>;

  getAllSubscribers(): ICustomerDTO[];

  getAllEmails(): string[];
}

export { ICustomersRepository, CUSTOMERS_REPOSITORY };
