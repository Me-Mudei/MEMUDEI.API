import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import UserPrismaRepository from "../repository/user-prisma.repository";
import PrismaConnection from "../../../@shared/infra/database/prisma";

export default class PrismaRepositoryFactory implements RepositoryFactory {
  private prisma: PrismaConnection;
  constructor() {
    this.prisma = new PrismaConnection();
  }
  createUserRepository() {
    return new UserPrismaRepository(this.prisma);
  }
}
