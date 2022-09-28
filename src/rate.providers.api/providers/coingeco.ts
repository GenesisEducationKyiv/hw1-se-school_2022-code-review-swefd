import { Injectable } from '@nestjs/common';
import { AbstractProvider } from './abstractProvider';
import { CurrencyPairDto, RateResponseDto } from '../dto';
import { Currency } from '../../utils/enums/currency/currency.enum';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Coingeco extends AbstractProvider {
  constructor(
    protected httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    super(httpService);
    this.url = configService.get<string>('Provider.coingeco.url');
  }

  buildUrl(url: string, currencyPair) {
    const fromCurrency = this.configService.get<string>(
      `Provider.coingeco.currencyName.${currencyPair.fromCurrency}`,
    );

    const toCurrency = this.configService.get<string>(
      `Provider.coingeco.currencyName.${currencyPair.toCurrency}`,
    );

    return url
      .replace('{fromCurrency}', fromCurrency)
      .replace('{toCurrency}', toCurrency);
  }

  parseRate(currencyPair: CurrencyPairDto, response: any): RateResponseDto {
    const key1 = Object.keys(response)[0];
    const key2 = Object.keys(response[key1])[0];
    return new RateResponseDto(
      Currency.UAH,
      Currency.BTC,
      response[key1][key2],
    );
  }
}
