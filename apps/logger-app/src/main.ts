import { NestFactory } from '@nestjs/core';
import { AppLoggerModule } from './app-logger.module';
import { RmqService } from '../../../libs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppLoggerModule);

  const rmqService = app.get<RmqService>(RmqService);

  app.connectMicroservice(rmqService.getOptions('LOG'));

  await app.startAllMicroservices();
}

bootstrap();
