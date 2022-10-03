import { CacheModule, Module } from '@nestjs/common';
import { RateController } from './controller/rate.controller';
import { RateService } from './service/rate.service';
import { RateProvidersApiModule } from '../rate.providers.api/rate.providers.api.module';
import { LogModule } from '../log/log.module';

const Cache = CacheModule.register({
  ttl: 300, // seconds
});

@Module({
  imports: [RateProvidersApiModule, LogModule, Cache],
  controllers: [RateController],
  providers: [RateService],
})
export class RateModule {}
