import { RepositoryFactory } from '../../../domain/factory';
import { UserInMemoryRepository } from '../../repository';

export class InMemoryRepositoryFactory implements RepositoryFactory {
  createUserRepository() {
    return new UserInMemoryRepository();
  }
}
