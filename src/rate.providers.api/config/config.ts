import { registerAs } from '@nestjs/config';

export default registerAs('Provider', () => ({
  main: process.env.MAIN_PROVIDER_ID || 0,

  binance: {
    id: 0,
    name: 'binance',
    url: 'https://api.binance.com/api/v3/ticker/price?symbol={fromCurrency}{toCurrency}',
  },
  coingeco: {
    id: 1,
    name: 'coingeco',
    url: 'https://api.coingecko.com/api/v3/simple/price?ids={fromCurrency}&vs_currencies={toCurrency}',
    currencyName: {
      BTC: 'bitcoin',
      UAH: 'uah',
    },
  },
}));
