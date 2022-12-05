import { RepositoryFactory } from '../../../domain/factory';
import { UserPrismaRepository } from '../../repository';
import { Connection, PrismaClient } from '../#shared/infra/database';

export class PrismaRepositoryFactory implements RepositoryFactory {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = Connection.getInstance();
  }
  createUserRepository() {
    return new UserPrismaRepository(this.prisma);
  }
}
