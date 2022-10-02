import { ICurrencyProvider } from '../providers/interfaces';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Coingeco } from '../providers';

export class CoingecoFactory {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  create(): ICurrencyProvider {
    return new Coingeco(this.httpService, this.configService);
  }
}
