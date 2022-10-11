import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CurrencyPairDto } from './dto';
import { config, mainProvider } from './init/init';
import { CURRENCY_PROVIDER } from './providers/interfaces';
import { BinanceFactory } from './factory/binanceFactory';
import { ClientsModule, Transport } from '@nestjs/microservices';
//amqps://covnwfip:ifMXmeVzQ39Rj9mDPl3piVuk26mk2Uy_@rattlesnake.rmq.cloudamqp.com/covnwfip

const RMQ = ClientsModule.register([
  {
    name: 'RATE_PROVIDERS_RMQ',
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://rabbitmq:5672'],
      queue: 'LOG_QUEUE',
      queueOptions: {
        durable: true,
      },
    },
  },
]);

@Module({
  imports: [config, HttpModule, RMQ],
  providers: [mainProvider, CurrencyPairDto, BinanceFactory],
  controllers: [],
  exports: [CURRENCY_PROVIDER, CurrencyPairDto],
})
export class RateProvidersApiModule {}
