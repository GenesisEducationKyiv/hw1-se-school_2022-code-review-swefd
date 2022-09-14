import { ICurrencyRateServiceFactory } from "../../../interfaces/ICurrencyRateServiceFactory";
import { ICurrencyRateProviderService } from "../../../interfaces/ICurrencyRateProviderService";
import axios from "axios";
import config from "../../../config/config";

class BinanceService implements ICurrencyRateProviderService {
  readonly reqUrl: string;

  constructor(reqUrl: string) {
    this.reqUrl = reqUrl;
  }

  async getRate() {
    const response = await axios.get(this.reqUrl).then((res) => {
      return Math.round(res.data["price"]).toString();
    });
    return Number(response);
  }
}

class BinanceServiceCreator implements ICurrencyRateServiceFactory {
  readonly url: string = config.currencyProviders[0].url;
  readonly reqUrl: string;
  readonly currency1: string;
  readonly currency2: string;

  constructor(currency1 = "BTC", currency2 = "UAH") {
    this.currency1 = currency1;
    this.currency2 = currency2;
    this.reqUrl = this.url
      .replace("{CURRENCY1}", this.currency1)
      .replace("{CURRENCY2}", this.currency2);
  }

  create(): ICurrencyRateProviderService {
    return new BinanceService(this.reqUrl);
  }
}

export { BinanceServiceCreator };
