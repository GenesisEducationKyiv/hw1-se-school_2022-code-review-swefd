import { IChainable } from './IChainable';
import { CurrencyPairDto, RateResponseDto } from '../../dto';

export const CURRENCY_PROVIDER = 'CURRENCY_PROVIDER';

interface ICurrencyServiceCommonMethods {
  getRate: (currencyPair: CurrencyPairDto) => Promise<RateResponseDto>;
  parseRate: (currencyPair: CurrencyPairDto, response: any) => RateResponseDto;
}

export type ICurrencyProvider = ICurrencyServiceCommonMethods & IChainable;
