import { ICurrencyRateProviderService } from "../../providers/interfaces/ICurrencyRateProviderService";

interface IProviderFactory {
  // nextProvider: ICurrencyRateServiceFactory | null;
  readonly url: string;
  readonly currency1: string;
  readonly currency2: string;
  create(): ICurrencyRateProviderService;
}

export { IProviderFactory };
