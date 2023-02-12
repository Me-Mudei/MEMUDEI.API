import { RepositoryFactory } from '../../../domain/factory';
import {
  CondominiumDetailInMemoryRepository,
  PrivacyTypeInMemoryRepository,
  PropertyDetailInMemoryRepository,
  PropertyRelationshipInMemoryRepository,
  PropertyTypeInMemoryRepository,
  RuleInMemoryRepository,
  ChargeInMemoryRepository,
  FloorPlanInMemoryRepository,
} from '../../repository';

export class InMemoryRepositoryFactory implements RepositoryFactory {
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
  createChargeRepository() {
    return new ChargeInMemoryRepository();
  }
  createFloorPlanRepository() {
    return new FloorPlanInMemoryRepository();
  }
}
