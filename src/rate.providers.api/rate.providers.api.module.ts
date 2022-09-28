import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CurrencyPairDto } from './dto';
import { config, mainProvider } from './init/init';
import { CURRENCY_PROVIDER } from './providers/interfaces';

@Module({
  imports: [config, HttpModule],
  providers: [mainProvider, CurrencyPairDto],
  controllers: [],
  exports: [CURRENCY_PROVIDER, CurrencyPairDto],
})
export class RateProvidersApiModule {}
