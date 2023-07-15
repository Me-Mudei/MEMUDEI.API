import { Connection, PrismaClient } from "#shared/infra";

import { RepositoryFactory } from "../../../domain/factory";
import { PropertyPrismaRepository } from "../../repository";

export class PrismaRepositoryFactory implements RepositoryFactory {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = Connection.getInstance();
  }
  createPropertyRepository() {
    return PropertyPrismaRepository.getInstance(this.prisma);
  }
}
