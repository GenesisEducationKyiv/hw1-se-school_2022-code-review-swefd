import { SUBSCRIBERS_REPOSITORY } from '../interface/ISubscribersRepository';
import { SubscribersRepository } from '../service/repository.service';

export const subscribersRepository = {
  provide: SUBSCRIBERS_REPOSITORY,
  useFactory: () => {
    return new SubscribersRepository(
      '/apps/gses2-app/src/repository/local/db.txt',
    );
  },
};
