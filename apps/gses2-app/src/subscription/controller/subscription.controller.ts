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

@Controller('subscribe')
export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) {}

  @Post()
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  public async subscribeEmail(
    @Body() subscriber: SubscribeEmailDto,
  ): Promise<string> {
    try {
      return await this.subscriptionService.addNewEmail(subscriber.email);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
