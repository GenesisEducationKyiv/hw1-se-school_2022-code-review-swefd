import {
  BadRequestException,
  CacheInterceptor,
  CacheTTL,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { RateService } from '../service/rate.service';
import { logDecorator } from '../../log/service/providerLogger';

@Controller('rate')
@CacheTTL(300)
@UseInterceptors(CacheInterceptor)
export class RateController {
  constructor(private rateService: RateService) {}

  @Get()
  @logDecorator(true)
  public async getRate() {
    try {
      return await this.rateService.getRate();
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
