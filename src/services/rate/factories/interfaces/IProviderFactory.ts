import { ICurrencyRateProviderService } from "../../providers/interfaces/ICurrencyRateProviderService";

interface IProviderFactory {
  create(): ICurrencyRateProviderService;
}

export { IProviderFactory };
