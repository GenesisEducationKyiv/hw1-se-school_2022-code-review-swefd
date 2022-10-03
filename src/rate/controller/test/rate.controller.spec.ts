import { Test, TestingModule } from '@nestjs/testing';
import { RateController } from '../rate.controller';
import { RateService } from '../../service/rate.service';
import { RateProvidersApiModule } from '../../../rate.providers.api/rate.providers.api.module';
import { LogModule } from '../../../log/log.module';

describe('RateController', () => {
  let controller: RateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RateProvidersApiModule, LogModule],
      controllers: [RateController],
      providers: [RateService],
    }).compile();

    controller = module.get<RateController>(RateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
