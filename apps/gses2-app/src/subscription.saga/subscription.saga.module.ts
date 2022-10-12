import { Module } from '@nestjs/common';
import { RmqModule } from '@app/libs/common';
import { SagaModule } from 'nestjs-saga';
import { SubscriptionModule } from '../subscription/subscription.module';
import { SubscribeSaga } from './subscription.saga.service';

const RMQ = RmqModule.register({
  name: 'CUSTOMER_RMQ',
  queue: 'CUSTOMER_QUEUE',
});

const sagaModule = SagaModule.register({
  imports: [RMQ, SubscriptionModule], // optional
  providers: [], // optional
  sagas: [SubscribeSaga], // required
});

@Module({
  imports: [SubscriptionModule, sagaModule],
  providers: [SubscribeSaga],
  exports: [sagaModule],
})
export class SubscriptionSagaModule {}
