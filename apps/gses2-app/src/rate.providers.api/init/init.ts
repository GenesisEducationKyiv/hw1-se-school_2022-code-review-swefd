import { ConfigModule, ConfigService } from '@nestjs/config';
import currencyProvidersConfigFile from '../config/config';
import { CURRENCY_PROVIDER, ICurrencyProvider } from '../providers/interfaces';
import { HttpService } from '@nestjs/axios';
import { Binance, Coingeco } from '../providers';
import { ClientProxy } from '@nestjs/microservices';

export const config = ConfigModule.forRoot({
  load: [currencyProvidersConfigFile],
  isGlobal: false,
});

export const mainProvider = {
  provide: CURRENCY_PROVIDER,
  useFactory: (
    httpService: HttpService,
    configService: ConfigService,
    eventDispatcher,
    client: ClientProxy,
  ) => {
    const mainProviderId = configService.get<number>('Provider.main');

    const providers: ICurrencyProvider[] = [];

    providers.push(new Binance(httpService, configService, client));
    providers.push(new Coingeco(httpService, configService, client));

    if (providers.length > 1) {
      chainProviders(providers);
    }

    return providers[mainProviderId | 0];
  },
  inject: [
    HttpService,
    ConfigService,
    { token: 'EVENT_DISPATCHER', optional: true },
    { token: 'RATE_PROVIDERS_RMQ', optional: true },
  ],
};

const chainProviders = (list: ICurrencyProvider[]) => {
  list[list.length - 1].setNext(list[0]);
  for (let i = 1; i < list.length; i++) {
    list[i - 1].setNext(list[i]);
  }
};

// const attachListener = () => {
//   const apiListener = this.exchangeApiListenerCreator.createListener();
//
//   this.eventDispatcher.attach(apiListener, Event.ExchangeApiResponse);
// };
