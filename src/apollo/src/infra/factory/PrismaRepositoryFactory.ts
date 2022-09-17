import RepositoryFactory from '../../domain/factory/RepositoryFactory';
import UserPrismaRepository from '../repository/UserPrismaRepository';
import PrismaConnection from '../database/prisma';

export default class PrismaRepositoryFactory implements RepositoryFactory {
  private prisma: PrismaConnection
  constructor() {
    this.prisma = new PrismaConnection();
  }
  createUserRepository() {
    return new UserPrismaRepository(this.prisma);
  }
}
