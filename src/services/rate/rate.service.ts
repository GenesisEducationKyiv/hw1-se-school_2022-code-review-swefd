import { FactoriesManager } from "./factories/factoriesManager";

class RateService {
  getRate() {
    return FactoriesManager.main.create().getRate();
  }
}

export default new RateService();
