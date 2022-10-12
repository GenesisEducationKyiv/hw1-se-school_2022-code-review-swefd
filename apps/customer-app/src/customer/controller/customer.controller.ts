import { Controller, Inject } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import {
  CUSTOMERS_REPOSITORY,
  ICustomersRepository,
} from '../../repository/interface/ICustomersRepository';
import { CustomerDto } from '../../repository/dto/customer.dto';

@Controller('Customer')
export class CustomerController {
  constructor(
    @Inject(CUSTOMERS_REPOSITORY) private repository: ICustomersRepository,
  ) {}

  @EventPattern('add-customer')
  async createCustomer(email: string) {
    console.log('[CUSTOMER]' + 'add-customer');
    await this.repository.append(new CustomerDto(email));
  }

  @EventPattern('remove-customer')
  async deleteCustomer(email: string) {
    console.log('[CUSTOMER]' + 'remove-customer');
    this.repository.delete(new CustomerDto(email));
  }
}
