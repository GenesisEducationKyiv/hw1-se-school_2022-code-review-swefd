import { Inject, Injectable } from '@nestjs/common';
import { AbstractProvider } from '../abstractProvider';
import { HttpService } from '@nestjs/axios';
import { CurrencyPairDto, RateResponseDto } from '../../dto';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class Binance extends AbstractProvider {
  constructor(
    protected readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject('RATE_PROVIDERS_RMQ') protected readonly client: ClientProxy,
  ) {
    super(httpService, client);
    this.url = configService.get<string>('Provider.binance.url');
  }

  buildUrl(url: string, currencyPair) {
    return url
      .replace('{fromCurrency}', currencyPair.fromCurrency)
      .replace('{toCurrency}', currencyPair.toCurrency);
  }

  parseRate(currencyPair: CurrencyPairDto, response: any): RateResponseDto {
    const rate = Math.round(response.price);
    return new RateResponseDto(
      currencyPair.fromCurrency,
      currencyPair.toCurrency,
      rate,
    );
  }
}
