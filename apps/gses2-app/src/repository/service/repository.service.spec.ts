import { Test, TestingModule } from '@nestjs/testing';
import { SubscribersRepository } from './repository.service';
import { subscribersRepository } from '../init/init';
import { SUBSCRIBERS_REPOSITORY } from '../interface/ISubscribersRepository';

describe('RepositoryService', () => {
  let service: SubscribersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [subscribersRepository],
      exports: [SUBSCRIBERS_REPOSITORY],
    }).compile();

    service = module.get<SubscribersRepository>(SUBSCRIBERS_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
