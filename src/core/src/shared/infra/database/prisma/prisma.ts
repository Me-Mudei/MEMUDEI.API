import { PrismaClient } from "@prisma/client";
export class Prisma {
  static getInstance() {
    const prisma = new PrismaClient();
    return prisma;
  }
}

export * from "@prisma/client";
