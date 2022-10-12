import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from '../../utils/filters/HttpExceptionFilter';
import { SubscribeEmailDto } from '../dto/SubscribeEmailDto';
import { SubscriptionService } from '../service/subscription.service';
import { CommandBus } from '@nestjs/cqrs';
import { SubscribeSagaCommand } from '../../subscription.saga/subscription.saga.service';

@Controller('subscribe')
export class SubscriptionController {
  constructor(
    private subscriptionService: SubscriptionService,
    private _commandBus: CommandBus,
  ) {}

  @Post()
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  public async subscribeEmail(
    @Body() subscriber: SubscribeEmailDto,
  ): Promise<string> {
    try {
      //return await this.subscriptionService.addNewEmail(subscriber.email);
      console.log('sub req');
      const res = await this._commandBus.execute(
        new SubscribeSagaCommand(subscriber.email),
      );
      console.log(res);
      return 'Email successfully added';
    } catch (error) {
      throw new BadRequestException();
      return 'asd';
    }
  }
}
