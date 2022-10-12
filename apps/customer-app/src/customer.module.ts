import { Module } from '@nestjs/common';
import { RmqModule } from '../../../libs/common';
import { CustomerController } from './customer/controller/customer.controller';
import { CustomerService } from './customer/service/customer.service';
import { RepositoryModule } from './repository/repository.module';
import { ConfigModule } from '@nestjs/config';

const config = ConfigModule.forRoot({
  envFilePath: './apps/customer-app/.env',
  isGlobal: true,
});

@Module({
  imports: [
    config,
    RepositoryModule,
    RmqModule.register({ name: 'CUSTOMER_RMQ', queue: 'CUSTOMER_QUEUE' }),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [],
})
export class CustomerModule {}
