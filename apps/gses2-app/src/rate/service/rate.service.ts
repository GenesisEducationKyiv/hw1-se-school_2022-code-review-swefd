import { Inject, Injectable } from '@nestjs/common';
import { CurrencyPairDto } from '../../rate.providers.api/dto';
import { Currency } from '../../utils/enums/currency/currency.enum';
import {
  CURRENCY_PROVIDER,
  ICurrencyProvider,
} from '../../rate.providers.api/providers/interfaces';
import { logDecorator } from '../../log/service/providerLogger';

@Injectable()
export class RateService {
  constructor(
    @Inject(CURRENCY_PROVIDER) private readonly Provider: ICurrencyProvider,
  ) {}

  @logDecorator(true)
  public async getRate() {
    return this.Provider.getRate(
      new CurrencyPairDto(Currency.BTC, Currency.UAH),
    );
  }
}
