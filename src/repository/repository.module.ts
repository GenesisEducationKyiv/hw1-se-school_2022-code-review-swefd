import { Module } from '@nestjs/common';
import { SubscribersRepository } from './service/repository.service';

@Module({
  providers: [SubscribersRepository],
  exports: [SubscribersRepository],
})
export class RepositoryModule {}
