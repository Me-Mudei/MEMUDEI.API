import { RepositoryFactory } from '../../../domain/factory';
import {
  PropertyTypePrismaRepository,
  PrivacyTypePrismaRepository,
  PropertyRelationshipPrismaRepository,
  PropertyDetailPrismaRepository,
  CondominiumDetailPrismaRepository,
  RulePrismaRepository,
  ChargePrismaRepository,
  FloorPlanPrismaRepository,
} from '../../repository';
import { Connection, PrismaClient } from '#shared/infra';

export class PrismaRepositoryFactory implements RepositoryFactory {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = Connection.getInstance();
  }
  createPropertyTypeRepository() {
    return new PropertyTypePrismaRepository(this.prisma);
  }
  createPrivacyTypeRepository() {
    return new PrivacyTypePrismaRepository(this.prisma);
  }
  createPropertyRelationshipRepository() {
    return new PropertyRelationshipPrismaRepository(this.prisma);
  }
  createPropertyDetailRepository() {
    return new PropertyDetailPrismaRepository(this.prisma);
  }
  createCondominiumDetailRepository() {
    return new CondominiumDetailPrismaRepository(this.prisma);
  }
  createRuleRepository() {
    return new RulePrismaRepository(this.prisma);
  }
  createChargeRepository() {
    return new ChargePrismaRepository(this.prisma);
  }
  createFloorPlanRepository() {
    return new FloorPlanPrismaRepository(this.prisma);
  }
}
