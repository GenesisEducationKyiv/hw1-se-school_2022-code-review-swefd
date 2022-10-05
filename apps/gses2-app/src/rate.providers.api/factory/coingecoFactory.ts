import { ICurrencyProvider } from '../providers/interfaces';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Coingeco } from '../providers';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

export class CoingecoFactory {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject('RATE_PROVIDERS_RMQ') protected readonly client: ClientProxy,
  ) {}

  create(): ICurrencyProvider {
    return new Coingeco(this.httpService, this.configService, this.client);
  }
}
