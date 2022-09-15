import { ICurrencyRateServiceFactory } from "../../../interfaces/ICurrencyRateServiceFactory";
import { BinanceServiceCreator } from "./rate.binance.service";
import { CoingecoServiceCreator } from "./rate.coingeco.service";
import { ICurrencyProviders } from "../../../interfaces/ICurrencyProviders";

class CurrencyProviders implements ICurrencyProviders {
  list: ICurrencyRateServiceFactory[] = [];

  readonly main: ICurrencyRateServiceFactory;

  constructor() {
    const binanceCreator = new BinanceServiceCreator();
    const coingecoCreator = new CoingecoServiceCreator();

    this.list.push(binanceCreator);
    this.list.push(coingecoCreator);

    const mainProviderId = Number(process.env.CRYPTO_CURRENCY_PROVIDER);
    this.main = this.list[mainProviderId] || binanceCreator;

    if (this.list.length > 1) {
      for (let i = 1; i < this.list.length; i++) {
        this.list[i - 1].setNext(this.list[i]);
      }
    }
  }
}

const instance = new CurrencyProviders();
export { instance as CurrencyProvider };
