type rate = number;

interface ICurrencyRateProviderService {
  getRate(): Promise<rate>;
  getName(): string;
}

export { ICurrencyRateProviderService, rate };
