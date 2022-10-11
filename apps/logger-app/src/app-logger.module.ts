import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomLoggerModule } from './custom-logger/custom-logger.module';
import { RmqModule } from '../../../libs/common';

const config = ConfigModule.forRoot({
  envFilePath: './apps/logger-app/.env',
  isGlobal: true,
});

@Module({
  imports: [
    config,
    CustomLoggerModule,
    RmqModule.register({ name: 'RATE_PROVIDERS_RMQ' }),
  ],
  controllers: [],
  providers: [],
})
export class AppLoggerModule {}
