import { Module } from '@nestjs/common';
import { CustomLoggerController } from './controller';
import { CustomLoggerService } from './service';

@Module({
  controllers: [CustomLoggerController],
  providers: [CustomLoggerService],
  exports: [CustomLoggerService],
})
export class CustomLoggerModule {}
