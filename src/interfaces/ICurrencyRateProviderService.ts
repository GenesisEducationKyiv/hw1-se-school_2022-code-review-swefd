type rate = number | null;

interface ICurrencyRateProviderService {
  readonly reqUrl: string;
  getRate(): Promise<rate>;
}

export { ICurrencyRateProviderService, rate };
