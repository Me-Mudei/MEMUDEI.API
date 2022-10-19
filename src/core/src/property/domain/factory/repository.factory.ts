import {
  PropertyRepository,
  PropertyTypeRepository,
  PrivacyTypeRepository,
  PropertyRelationshipRepository,
  PropertyDetailRepository,
  CondominiumDetailRepository,
  RuleRepository,
} from '../repository';

export interface RepositoryFactory {
  createPropertyRepository(): PropertyRepository.Repository;
  createPropertyTypeRepository(): PropertyTypeRepository;
  createPrivacyTypeRepository(): PrivacyTypeRepository;
  createPropertyRelationshipRepository(): PropertyRelationshipRepository;
  createPropertyDetailRepository(): PropertyDetailRepository;
  createCondominiumDetailRepository(): CondominiumDetailRepository;
  createRuleRepository(): RuleRepository;
}
