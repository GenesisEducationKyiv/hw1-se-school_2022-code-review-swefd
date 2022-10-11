import { Currency } from '../../utils/enums/currency/currency.enum';

export class CurrencyPairDto {
  fromCurrency: Currency;
  toCurrency: Currency;

  constructor(fromCurrency: Currency, toCurrency: Currency) {
    this.fromCurrency = fromCurrency;
    this.toCurrency = toCurrency;
  }
}
