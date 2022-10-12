import { Module } from '@nestjs/common';
import { CUSTOMERS_REPOSITORY } from './interface/ICustomersRepository';
import { subscribersRepository } from './init/init';

@Module({
  providers: [subscribersRepository],
  exports: [CUSTOMERS_REPOSITORY],
})
export class RepositoryModule {}
