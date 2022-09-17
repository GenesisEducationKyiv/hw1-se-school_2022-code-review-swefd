import config from "../../../config/config";
import { ICurrencyRateProviderService } from "../providers/interfaces/ICurrencyRateProviderService";
import { BinanceService } from "../providers/rate.binance.service";
import { providerFactory } from "./providerFactory";

class BinanceProviderFactory extends providerFactory {
  readonly url: string = config.currencyProviders[0].url;
  readonly reqUrl: string;
  readonly currency1: string;
  readonly currency2: string;

  // Currency is temporary hardcoded :)
  constructor(currency1 = "BTC", currency2 = "UAH") {
    super();
    this.currency1 = currency1;
    this.currency2 = currency2;
    this.reqUrl = this.url
      .replace("{CURRENCY1}", this.currency1)
      .replace("{CURRENCY2}", this.currency2);
  }

  create(): ICurrencyRateProviderService {
    const binanceService = new BinanceService(
      this.reqUrl,
      this.currency1,
      this.currency2
    );
    binanceService.setNext(this.nextProvider || null);
    return binanceService;
  }
}

export { BinanceProviderFactory };
