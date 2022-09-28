import { Module } from '@nestjs/common';
import { EmailService } from './service/email.service';
import { EmailController } from './controller/email.controller';
import { Mailer } from './init/init';
import { RepositoryModule } from '../repository/repository.module';

@Module({
  imports: [Mailer, RepositoryModule],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
