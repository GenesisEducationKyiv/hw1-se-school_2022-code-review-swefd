import { ICurrencyRateServiceFactory } from "../../../interfaces/ICurrencyRateServiceFactory";
import { ICurrencyRateProviderService } from "../../../interfaces/ICurrencyRateProviderService";
import axios from "axios";
import config from "../../../config/config";

class CoingecoService implements ICurrencyRateProviderService {
  readonly reqUrl: string;
  readonly currency1: string;
  readonly currency2: string;

  constructor(reqUrl: string, currency1: string, currency2: string) {
    this.reqUrl = reqUrl;
    this.currency1 = currency1;
    this.currency2 = currency2;
  }

  async getRate() {
    const response = await axios.get(this.reqUrl).then((res) => {
      return Math.round(res.data[this.currency1][this.currency2]).toString();
    });
    return Number(response);
  }
}

class CoingecoServiceCreator implements ICurrencyRateServiceFactory {
  readonly url: string = config.currencyProviders[1].url;
  readonly reqUrl: string;
  readonly currency1: string;
  readonly currency2: string;

  constructor(currency1 = "bitcoin", currency2 = "uah") {
    this.currency1 = currency1;
    this.currency2 = currency2;
    this.reqUrl = this.url
      .replace("{CURRENCY1}", this.currency1)
      .replace("{CURRENCY2}", this.currency2);
  }

  create(): ICurrencyRateProviderService {
    return new CoingecoService(this.reqUrl, this.currency1, this.currency2);
  }
}

export { CoingecoServiceCreator };
