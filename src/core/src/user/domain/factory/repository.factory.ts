import { UserRepository } from '../repository';

export interface RepositoryFactory {
  createUserRepository(): UserRepository.Repository;
}
