import { CurrencyProvider } from "./curencyProviders/CurrencyProviders";

class RateService {
  getRate() {
    return CurrencyProvider.main.create().getRate();
  }
}

export default new RateService();
