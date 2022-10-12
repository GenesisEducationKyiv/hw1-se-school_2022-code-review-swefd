import { Module } from '@nestjs/common';
import { SubscriptionService } from './service/subscription.service';
import { SubscriptionController } from './controller/subscription.controller';
import { RepositoryModule } from '../repository/repository.module';
import { SagaModule } from 'nestjs-saga';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [RepositoryModule, CqrsModule],
  providers: [SubscriptionService],
  controllers: [SubscriptionController],
})
export class SubscriptionModule {}
