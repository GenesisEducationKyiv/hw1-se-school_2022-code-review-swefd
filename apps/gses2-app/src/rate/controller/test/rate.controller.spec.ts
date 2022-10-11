import { Test, TestingModule } from '@nestjs/testing';
import { RateController } from '../rate.controller';
import { RateService } from '../../service/rate.service';
import { RateProvidersApiModule } from '../../../rate.providers.api/rate.providers.api.module';
import { LogModule } from '../../../log/log.module';
import { CacheModule } from '@nestjs/common';

const Cache = CacheModule.register({
  ttl: 300, // seconds
});

describe('RateController', () => {
  let controller: RateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RateProvidersApiModule, LogModule, Cache],
      controllers: [RateController],
      providers: [RateService],
    }).compile();

    controller = module.get<RateController>(RateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
