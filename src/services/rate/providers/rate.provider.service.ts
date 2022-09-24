import { IProviderFactory } from "../factories/interfaces/IProviderFactory";
import { IChainable } from "../../../interfaces/IChainable";
import { providerFactory } from "../factories/providerFactory";
import axios, { AxiosResponse } from "axios";
import { ICurrencyRateProviderService } from "./interfaces/ICurrencyRateProviderService";
import { cacheLocal } from "../../../utils/cache";
import { ICacheable } from "../../../interfaces/ICacheable";
import config from "../../../config/config";

abstract class RateProviderService
  implements ICurrencyRateProviderService, IChainable, ICacheable
{
  abstract readonly cacheKey: string;

  protected nextProvider: IProviderFactory | null = null;

  readonly reqUrl: string;
  readonly currency1: string;
  readonly currency2: string;

  protected constructor(reqUrl: string, currency1: string, currency2: string) {
    this.reqUrl = reqUrl;
    this.currency1 = currency1;
    this.currency2 = currency2;
  }

  getFromCache(cacheKey: any) {
    let cacheRate: string | undefined | null = cacheLocal.get<string>(
      this.cacheKey
    );

    if (cacheRate) {
      console.log("cache");
      return cacheRate;
    }

    return null;
  }

  async getRate() {
    let rate: number;

    if (config.cache.enable) {
      rate = Number(this.getFromCache(this.cacheKey));
      if (rate) {
        return rate;
      }
    }

    const response = await axios
      .get(this.reqUrl)
      .then((res) => {
        const rate = this.parseRate(res).toString();
        cacheLocal.set(this.cacheKey, rate);
        return rate;
      })
      .catch(() => {
        return this.nextProvider?.create().getRate();
      });
    return Number(response);
  }

  abstract parseRate(response: AxiosResponse<any>): number;

  setNext(factory: providerFactory | null): providerFactory {
    this.nextProvider = factory;
    return <providerFactory>factory;
  }

  getName(): string {
    return this.cacheKey;
  }
}

export { RateProviderService };
