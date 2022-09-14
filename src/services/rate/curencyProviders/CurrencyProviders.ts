import { ICurrencyRateServiceFactory } from "../../../interfaces/ICurrencyRateServiceFactory";
import { BinanceServiceCreator } from "./rate.binance.service";
import { CoingecoServiceCreator } from "./rate.coingeco.service";
import { ICurrencyProviders } from "../../../interfaces/ICurrencyProviders";

class CurrencyProviders implements ICurrencyProviders {
  list = new Map<number, ICurrencyRateServiceFactory>();

  readonly main: ICurrencyRateServiceFactory;

  constructor() {
    const binanceCreator = new BinanceServiceCreator();
    const coingecoCreator = new CoingecoServiceCreator();

    this.list.set(0, binanceCreator);
    this.list.set(1, coingecoCreator);

    const mainProviderId = Number(process.env.CRYPTO_CURRENCY_PROVIDER);
    this.main = this.list.get(mainProviderId) || binanceCreator;
  }
}

const instance = new CurrencyProviders();
export { instance as CurrencyProvider };
