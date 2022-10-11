import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { Mailer } from '../init/init';
import { RepositoryModule } from '../../repository/repository.module';
import { RateProvidersApiModule } from '../../rate.providers.api/rate.providers.api.module';
import { EmailController } from '../controller/email.controller';

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [Mailer, RepositoryModule, RateProvidersApiModule],
      controllers: [EmailController],
      providers: [EmailService],
      exports: [EmailService],
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
