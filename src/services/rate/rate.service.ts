import { CurrencyProvider } from "./curencyProviders/currencyProviders";

class RateService {
  getRate() {
    return CurrencyProvider.main.create().getRate();
  }
}

export default new RateService();
