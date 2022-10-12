import { Builder, Saga } from 'nestjs-saga';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NotificationContract } from '@app/libs/common/src/rmq/notification.const';
import { SubscriptionService } from '../subscription/service/subscription.service';

export class SubscribeSagaCommand {
  constructor(public email: string) {}
}

@Saga(SubscribeSagaCommand)
export class SubscribeSaga {
  private sagaResult = false;

  constructor(
    private subscriptionService: SubscriptionService,
    @Inject('CUSTOMER_RMQ') private customerRMQ: ClientProxy,
  ) {}

  saga = new Builder<SubscribeSagaCommand, boolean>()
    .step('Subscribe')
    .invoke(this.subscribe)
    .withCompensation(this.unsubscribe)
    .step('Create Customer')
    .invoke(this.createCustomer)
    .withCompensation(this.deleteCustomer)
    .return(this.buildResult)
    .build();

  async subscribe(cmd: SubscribeSagaCommand) {
    console.log('saga subscribe');
    this.sagaResult = await this.subscriptionService.addNewEmail(cmd.email);
  }
  async unsubscribe(cmd: SubscribeSagaCommand) {
    this.subscriptionService.removeEmail(cmd.email);
  }

  async createCustomer(cmd: SubscribeSagaCommand) {
    this.customerRMQ.emit(NotificationContract.addCustomer, cmd.email);
  }

  async deleteCustomer(cmd: SubscribeSagaCommand) {
    this.customerRMQ.emit(NotificationContract.removeCustomer, cmd.email);
  }

  buildResult(): boolean {
    return this.sagaResult;
  }
}
