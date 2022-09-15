import { ICurrencyRateServiceFactory } from "../../../interfaces/ICurrencyRateServiceFactory";
import { ICurrencyRateProviderService } from "../../../interfaces/ICurrencyRateProviderService";
import axios from "axios";
import config from "../../../config/config";
import { CurrencyRateProviderService } from "./currencyRateProviderService";

class BinanceService
  extends CurrencyRateProviderService
  implements ICurrencyRateProviderService
{
  readonly reqUrl: string;

  constructor(reqUrl: string) {
    super();
    this.reqUrl = reqUrl;
  }

  async getRate() {
    const response = await axios
      .get(this.reqUrl)
      .then((res) => {
        return Math.round(res.data["price"]).toString();
      })
      .catch(() => {
        return this.nextProvider?.create().getRate();
      });
    return Number(response);
  }
}

class BinanceServiceCreator implements ICurrencyRateServiceFactory {
  nextProvider: ICurrencyRateServiceFactory | null = null;
  readonly url: string = config.currencyProviders[0].url;
  readonly reqUrl: string;
  readonly currency1: string;
  readonly currency2: string;

  // Currency is temporary hardcoded :)
  constructor(currency1 = "BTC", currency2 = "UAH") {
    this.currency1 = currency1;
    this.currency2 = currency2;
    this.reqUrl = this.url
      .replace("{CURRENCY1}", this.currency1)
      .replace("{CURRENCY2}", this.currency2);
  }

  create(): ICurrencyRateProviderService {
    const binanceService = new BinanceService(this.reqUrl);
    binanceService.setNext(this.nextProvider || null);
    return binanceService;
  }

  setNext(
    provider: ICurrencyRateServiceFactory | null
  ): ICurrencyRateServiceFactory {
    this.nextProvider = provider;
    return <ICurrencyRateServiceFactory>provider;
  }
}

export { BinanceServiceCreator };
