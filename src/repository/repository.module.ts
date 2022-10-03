import { Module } from '@nestjs/common';
import { SUBSCRIBERS_REPOSITORY } from './interface/ISubscribersRepository';
import { subscribersRepository } from './init/init';

@Module({
  providers: [subscribersRepository],
  exports: [SUBSCRIBERS_REPOSITORY],
})
export class RepositoryModule {}
