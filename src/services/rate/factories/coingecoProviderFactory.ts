import config from "../../../config/config";
import { ICurrencyRateProviderService } from "../providers/interfaces/ICurrencyRateProviderService";
import { CoingecoService } from "../providers/rate.coingeco.service";
import { providerFactory } from "./providerFactory";
import { ProviderLogger } from "../../../utils/logger";

class CoingecoProviderFactory extends providerFactory {
  readonly url: string = config.currencyProviders[1].url;
  readonly reqUrl: string;
  readonly currency1: string;
  readonly currency2: string;

  // Currency is temporary hardcoded :)
  constructor(currency1 = "bitcoin", currency2 = "uah") {
    super();
    this.currency1 = currency1;
    this.currency2 = currency2;
    this.reqUrl = this.url
      .replace("{CURRENCY1}", this.currency1)
      .replace("{CURRENCY2}", this.currency2);
  }

  create(): ICurrencyRateProviderService {
    const coingecoService = new CoingecoService(
      this.reqUrl,
      this.currency1,
      this.currency2
    );
    coingecoService.setNext(this.nextProvider);
    return new ProviderLogger(coingecoService);
  }
}

export { CoingecoProviderFactory };
