type rate = number;

interface ICurrencyRateProviderService {
  readonly reqUrl: string;
  getRate(): Promise<rate>;
}

export { ICurrencyRateProviderService, rate };
