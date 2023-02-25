import { RepositoryFactory } from '../../../domain/factory';
import { PropertyInMemoryRepository } from '../../repository';

export class InMemoryRepositoryFactory implements RepositoryFactory {
  createPropertyRepository() {
    return PropertyInMemoryRepository.getInstance();
  }
}
