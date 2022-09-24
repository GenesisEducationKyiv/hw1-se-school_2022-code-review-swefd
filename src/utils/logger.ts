import {
  ICurrencyRateProviderService,
  rate,
} from "../services/rate/providers/interfaces/ICurrencyRateProviderService";
import { IChainable } from "../interfaces/IChainable";
import { providerFactory } from "../services/rate/factories/providerFactory";
import { IProviderFactory } from "../services/rate/factories/interfaces/IProviderFactory";

class ProviderLogger implements ICurrencyRateProviderService, IChainable {
  private provider: ICurrencyRateProviderService;
  private nextProvider: IProviderFactory | null = null;
  private logMsg = "#LOG PROVIDER ";

  constructor(provider: ICurrencyRateProviderService) {
    this.provider = provider;
  }

  async getRate(): Promise<rate> {
    const rate = await this.provider.getRate();
    this.log(rate);
    return Promise.resolve(rate);
  }

  log(rate: any) {
    const providerName = this.provider.getName();

    console.log(`${this.logMsg} ${providerName} Rate - ${rate}`);
  }

  getName(): string {
    return "Logger";
  }

  setNext(factory: providerFactory | null): providerFactory {
    this.nextProvider = factory;
    return <providerFactory>factory;
  }
}

export { ProviderLogger };
