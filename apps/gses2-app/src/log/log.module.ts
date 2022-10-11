import { Module } from '@nestjs/common';
import { LogService } from './service/log.service';
import { ConfigModule } from '@nestjs/config';
import { RmqModule } from '../../../../libs/common';

const config = ConfigModule.forRoot({
  envFilePath: './apps/gses2-app/.env',
  isGlobal: true,
});

@Module({
  imports: [config, RmqModule.register({ name: 'RATE_PROVIDERS_RMQ' })],
  providers: [LogService],
  exports: [LogService],
})
export class LogModule {}
