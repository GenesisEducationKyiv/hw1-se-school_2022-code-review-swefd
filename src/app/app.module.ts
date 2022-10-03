import { Module } from '@nestjs/common';
import { RateModule } from '../rate/rate.module';
import { RateProvidersApiModule } from '../rate.providers.api/rate.providers.api.module';
import { UtilsModule } from '../utils/utils.module';
import { ConfigModule } from '@nestjs/config';
import { RepositoryModule } from '../repository/repository.module';
import { SubscriptionModule } from '../subscription/subscription.module';
import { EmailModule } from '../email/email.module';

const config = ConfigModule.forRoot({
  isGlobal: false,
});

@Module({
  imports: [
    config,
    RateModule,
    RateProvidersApiModule,
    RepositoryModule,
    SubscriptionModule,
    EmailModule,
    UtilsModule,
  ],
})
export class AppModule {}
