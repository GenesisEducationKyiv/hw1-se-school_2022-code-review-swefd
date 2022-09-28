import { Test, TestingModule } from '@nestjs/testing';
import { SubscribersRepository } from './repository.service';

describe('RepositoryService', () => {
  let service: SubscribersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscribersRepository],
    }).compile();

    service = module.get<SubscribersRepository>(SubscribersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
