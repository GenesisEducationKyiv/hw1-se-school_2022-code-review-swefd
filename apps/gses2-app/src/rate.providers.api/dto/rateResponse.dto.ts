import { Currency } from '../../utils/enums/currency/currency.enum';

export class RateResponseDto {
  sourceCurrency: Currency;
  targetCurrency: Currency;
  rate: number;

  constructor(
    sourceCurrency: Currency,
    targetCurrency: Currency,
    rate: number,
  ) {
    this.sourceCurrency = sourceCurrency;
    this.targetCurrency = targetCurrency;
    this.rate = rate;
  }
}
