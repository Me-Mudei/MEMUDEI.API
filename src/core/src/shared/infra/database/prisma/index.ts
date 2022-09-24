import { PrismaClient } from "@prisma/client";
export default class Singleton {
  static getInstance() {
    const prisma = new PrismaClient();
    return prisma;
  }
}

export * from "@prisma/client";
