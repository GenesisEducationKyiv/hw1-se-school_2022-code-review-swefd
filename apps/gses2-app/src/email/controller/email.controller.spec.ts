import { Test, TestingModule } from '@nestjs/testing';
import { EmailController } from './email.controller';
import { Mailer } from '../init/init';
import { RepositoryModule } from '../../repository/repository.module';
import { RateProvidersApiModule } from '../../rate.providers.api/rate.providers.api.module';
import { EmailService } from '../service/email.service';

describe('EmailController', () => {
  let controller: EmailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [Mailer, RepositoryModule, RateProvidersApiModule],
      controllers: [EmailController],
      providers: [EmailService],
      exports: [EmailService],
    }).compile();

    controller = module.get<EmailController>(EmailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
