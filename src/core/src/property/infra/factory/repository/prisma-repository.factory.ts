import { RepositoryFactory } from '../../../domain/factory';
import { PropertyPrismaRepository } from '../../repository';
import { Connection, PrismaClient } from '#shared/infra';

export class PrismaRepositoryFactory implements RepositoryFactory {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = Connection.getInstance();
  }
  createPropertyRepository() {
    return new PropertyPrismaRepository(this.prisma);
  }
}
