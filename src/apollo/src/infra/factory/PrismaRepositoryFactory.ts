import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import UserPrismaRepository from "../../../../@core/user/infra/repository/user-prisma.repository";
import PrismaConnection from "../../../../@core/@shared/infra/database/prisma";

export default class PrismaRepositoryFactory implements RepositoryFactory {
  private prisma: PrismaConnection;
  constructor() {
    this.prisma = new PrismaConnection();
  }
  createUserRepository() {
    return new UserPrismaRepository(this.prisma);
  }
}
