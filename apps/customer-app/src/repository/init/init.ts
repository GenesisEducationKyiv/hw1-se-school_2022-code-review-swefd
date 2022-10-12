import { CUSTOMERS_REPOSITORY } from '../interface/ICustomersRepository';
import { SubscribersRepository } from '../service/repository.service';

export const subscribersRepository = {
  provide: CUSTOMERS_REPOSITORY,
  useFactory: () => {
    return new SubscribersRepository(
      '/apps/customer-app/src/repository/local/db.txt',
    );
  },
};
