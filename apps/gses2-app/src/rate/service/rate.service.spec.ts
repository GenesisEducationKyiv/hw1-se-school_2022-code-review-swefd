import { Test, TestingModule } from '@nestjs/testing';
import { RateService } from './rate.service';
import { RateProvidersApiModule } from '../../rate.providers.api/rate.providers.api.module';
import { LogModule } from '../../log/log.module';
import { RateController } from '../controller/rate.controller';
import { CacheModule } from '@nestjs/common';

const Cache = CacheModule.register({
  ttl: 300, // seconds
});

describe('RateService', () => {
  let service: RateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RateProvidersApiModule, LogModule, Cache],
      controllers: [RateController],
      providers: [RateService],
    }).compile();

    service = module.get<RateService>(RateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
