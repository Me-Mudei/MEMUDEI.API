import { RepositoryFactory } from '../../../domain/factory';
import {
  PropertyPrismaRepository,
  PropertyTypePrismaRepository,
  PrivacyTypePrismaRepository,
  PropertyRelationshipPrismaRepository,
  PropertyDetailPrismaRepository,
  CondominiumDetailPrismaRepository,
  RulePrismaRepository,
} from '../../repository';
import { Connection, PrismaClient } from '#shared/infra';

export class PrismaRepositoryFactory implements RepositoryFactory {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = Connection.getInstance();
  }
  createPropertyRepository() {
    return new PropertyPrismaRepository(this.prisma);
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
}
