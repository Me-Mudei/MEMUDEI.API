import { RepositoryFactory } from '../../../domain/factory';
import { PropertyPrismaRepository } from '../../repository';
import { Prisma, PrismaClient } from '../../../../shared/infra/database';

export class PrismaRepositoryFactory implements RepositoryFactory {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = Prisma.getInstance();
  }
  createPropertyRepository() {
    return new PropertyPrismaRepository(this.prisma);
  }
}
