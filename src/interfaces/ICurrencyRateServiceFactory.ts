import { ICurrencyRateProviderService } from "./ICurrencyRateProviderService";

interface ICurrencyRateServiceFactory {
  nextProvider: ICurrencyRateServiceFactory | null;
  readonly url: string;
  readonly currency1: string;
  readonly currency2: string;
  create(): ICurrencyRateProviderService;
  setNext(
    provider: ICurrencyRateServiceFactory | null
  ): ICurrencyRateServiceFactory;
}

export { ICurrencyRateServiceFactory };
