import { ICurrencyRateServiceFactory } from "./ICurrencyRateServiceFactory";

interface ICurrencyProviders {
  readonly main: ICurrencyRateServiceFactory;
  readonly list: ICurrencyRateServiceFactory[];
}

export { ICurrencyProviders };
