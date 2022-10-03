import { ICurrencyProvider } from '../providers/interfaces';
import { Binance } from '../providers';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

export class BinanceFactory {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  create(): ICurrencyProvider {
    return new Binance(this.httpService, this.configService);
  }
}
