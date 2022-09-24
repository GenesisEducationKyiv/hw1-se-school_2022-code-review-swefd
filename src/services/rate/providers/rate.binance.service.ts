import axios, { AxiosResponse } from "axios";
import { RateProviderService } from "./rate.provider.service";

class BinanceService extends RateProviderService {
  readonly cacheKey: string = "binance";

  constructor(reqUrl: string, currency1: string, currency2: string) {
    super(reqUrl, currency1, currency2);
  }

  parseRate(response: AxiosResponse<any>): number {
    return Math.round(response.data["price"]);
  }
}

export { BinanceService };
