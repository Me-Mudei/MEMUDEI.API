import { RepositoryFactory } from '../../../domain/factory';
import {
  CondominiumDetailInMemoryRepository,
  PrivacyTypeInMemoryRepository,
  PropertyDetailInMemoryRepository,
  PropertyInMemoryRepository,
  PropertyRelationshipInMemoryRepository,
  PropertyTypeInMemoryRepository,
  RuleInMemoryRepository,
} from '../../repository';

export class InMemoryRepositoryFactory implements RepositoryFactory {
  createPropertyRepository() {
    return new PropertyInMemoryRepository();
  }
  createPropertyTypeRepository() {
    return new PropertyTypeInMemoryRepository();
  }
  createPrivacyTypeRepository() {
    return new PrivacyTypeInMemoryRepository();
  }
  createPropertyRelationshipRepository() {
    return new PropertyRelationshipInMemoryRepository();
  }
  createPropertyDetailRepository() {
    return new PropertyDetailInMemoryRepository();
  }
  createCondominiumDetailRepository() {
    return new CondominiumDetailInMemoryRepository();
  }
  createRuleRepository() {
    return new RuleInMemoryRepository();
  }
}
