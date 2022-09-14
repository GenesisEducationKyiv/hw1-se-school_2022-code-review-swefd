import { ICurrencyRateServiceFactory } from "./ICurrencyRateServiceFactory";

interface ICurrencyProviders {
  readonly main: ICurrencyRateServiceFactory;
  readonly list: Map<number, ICurrencyRateServiceFactory>;
}

export { ICurrencyProviders };
