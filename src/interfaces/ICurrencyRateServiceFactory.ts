import { ICurrencyRateProviderService } from "./ICurrencyRateProviderService";

interface ICurrencyRateServiceFactory {
  readonly url: string;
  readonly currency1: string;
  readonly currency2: string;
  create(): ICurrencyRateProviderService;
}

export { ICurrencyRateServiceFactory };
