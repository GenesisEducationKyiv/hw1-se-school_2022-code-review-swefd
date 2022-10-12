import { NestFactory } from '@nestjs/core';
import { RmqService } from '../../../libs/common';
import { CustomerModule } from './customer.module';

async function bootstrap() {
  const app = await NestFactory.create(CustomerModule);

  const rmqService = app.get<RmqService>(RmqService);

  app.connectMicroservice(rmqService.getOptions('CUSTOMER'));

  await app.startAllMicroservices();
}

bootstrap();
