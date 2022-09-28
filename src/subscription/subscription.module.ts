import { Module } from '@nestjs/common';
import { SubscriptionService } from './service/subscription.service';
import { SubscriptionController } from './controller/subscription.controller';
import { RepositoryModule } from '../repository/repository.module';

@Module({
  imports: [RepositoryModule],
  providers: [SubscriptionService],
  controllers: [SubscriptionController],
})
export class SubscriptionModule {}
