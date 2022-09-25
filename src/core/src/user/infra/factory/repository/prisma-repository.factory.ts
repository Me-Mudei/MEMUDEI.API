import { RepositoryFactory } from '../../../domain/factory';
import { UserPrismaRepository } from '../../repository';
import { Prisma, PrismaClient } from '../../../../shared/infra/database';

export class PrismaRepositoryFactory implements RepositoryFactory {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = Prisma.getInstance();
  }
  createUserRepository() {
    return new UserPrismaRepository(this.prisma);
  }
}
