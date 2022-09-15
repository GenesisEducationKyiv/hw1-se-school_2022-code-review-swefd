import { ICurrencyRateServiceFactory } from "../../../interfaces/ICurrencyRateServiceFactory";

abstract class CurrencyRateProviderService {
  protected nextProvider: ICurrencyRateServiceFactory | null = null;

  async getRate(): Promise<Number> {
    return Promise.resolve(0);
  }

  setNext(
    provider: ICurrencyRateServiceFactory | null
  ): ICurrencyRateServiceFactory {
    this.nextProvider = provider;
    return <ICurrencyRateServiceFactory>provider;
  }
}

export { CurrencyRateProviderService };
