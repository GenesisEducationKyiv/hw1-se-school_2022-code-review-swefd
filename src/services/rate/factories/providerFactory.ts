import { ICurrencyRateProviderService } from "../providers/interfaces/ICurrencyRateProviderService";
import { IProviderFactory } from "./interfaces/IProviderFactory";
import { IChainable } from "../../../interfaces/IChainable";

abstract class providerFactory implements IProviderFactory, IChainable {
  abstract readonly currency1: string;
  abstract readonly currency2: string;
  abstract readonly url: string;

  protected nextProvider: providerFactory | null = null;

  setNext(provider: providerFactory): providerFactory {
    this.nextProvider = provider;
    return provider;
  }

  abstract create(): ICurrencyRateProviderService;
}

export { providerFactory };
