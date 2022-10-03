import { ConfigModule, ConfigService } from '@nestjs/config';
import currencyProvidersConfigFile from '../config/config';
import { CURRENCY_PROVIDER, ICurrencyProvider } from '../providers/interfaces';
import { HttpService } from '@nestjs/axios';
import { Binance } from '../providers';
import { Coingeco } from '../providers';

export const config = ConfigModule.forRoot({
  load: [currencyProvidersConfigFile],
  isGlobal: false,
});

export const mainProvider = {
  provide: CURRENCY_PROVIDER,
  useFactory: (httpService: HttpService, configService: ConfigService) => {
    const mainProviderId = configService.get<number>('Provider.main');

    const providers: ICurrencyProvider[] = [];

    providers.push(new Binance(httpService, configService));
    providers.push(new Coingeco(httpService, configService));

    if (providers.length > 1) {
      chainProviders(providers);
    }

    return providers[mainProviderId | 0];
  },
  inject: [HttpService, ConfigService],
};

const chainProviders = (list: ICurrencyProvider[]) => {
  list[list.length - 1].setNext(list[0]);
  for (let i = 1; i < list.length; i++) {
    list[i - 1].setNext(list[i]);
  }
};
