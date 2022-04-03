import { PrismaClient } from '@prisma/client';
import RepositoryFactory from '../../domain/factory/RepositoryFactory';
import UserPrismaRepository from '../repository/UserPrismaRepository';

export default class PrismaRepositoryFactory implements RepositoryFactory {
  constructor(private readonly prisma: PrismaClient) {}
  createUserRepository() {
    return new UserPrismaRepository(this.prisma);
  }
}
