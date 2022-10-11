import { ICurrencyProvider } from '../providers/interfaces';
import { Binance } from '../providers';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

export class BinanceFactory {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject('RATE_PROVIDERS_RMQ') protected readonly client: ClientProxy,
  ) {}

  create(): ICurrencyProvider {
    return new Binance(this.httpService, this.configService, this.client);
  }
}
