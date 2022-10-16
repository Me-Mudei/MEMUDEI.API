import { PropertyRepository } from '../repository';

export interface RepositoryFactory {
  createPropertyRepository(): PropertyRepository.Repository;
}
