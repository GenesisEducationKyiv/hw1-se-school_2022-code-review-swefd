import { IFactoriesManager } from "./interfaces/IFactoriesManager";
import { BinanceProviderFactory } from "./binanceProviderFactory";
import { CoingecoProviderFactory } from "./coingecoProviderFactory";
import { IProviderFactory } from "./interfaces/IProviderFactory";
import { providerFactory } from "./providerFactory";

class FactoriesManager implements IFactoriesManager {
  list: providerFactory[] = [];

  readonly main: IProviderFactory;

  constructor() {
    const binanceCreator = new BinanceProviderFactory();
    const coingecoCreator = new CoingecoProviderFactory();

    binanceCreator.setNext(coingecoCreator);

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

const instance = new FactoriesManager();
export { instance as FactoriesManager };
