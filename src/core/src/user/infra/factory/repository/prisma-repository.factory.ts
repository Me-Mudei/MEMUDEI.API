import RepositoryFactory from "../../../domain/factory/repository.factory";
import UserPrismaRepository from "../../repository/user-prisma.repository";
import Prisma, { PrismaClient } from "../../../../shared/infra/database/prisma";

export default class PrismaRepositoryFactory implements RepositoryFactory {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = Prisma.getInstance();
  }
  createUserRepository() {
    return new UserPrismaRepository(this.prisma);
  }
}
