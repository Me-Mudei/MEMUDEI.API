import {
  PropertyTypeRepository,
  PrivacyTypeRepository,
  PropertyRelationshipRepository,
  PropertyDetailRepository,
  CondominiumDetailRepository,
  RuleRepository,
  FloorPlanRepository,
  ChargeRepository,
} from '../repository';

export interface RepositoryFactory {
  createPropertyTypeRepository(): PropertyTypeRepository;
  createPrivacyTypeRepository(): PrivacyTypeRepository;
  createPropertyRelationshipRepository(): PropertyRelationshipRepository;
  createPropertyDetailRepository(): PropertyDetailRepository;
  createCondominiumDetailRepository(): CondominiumDetailRepository;
  createRuleRepository(): RuleRepository;
  createFloorPlanRepository(): FloorPlanRepository;
  createChargeRepository(): ChargeRepository;
}
