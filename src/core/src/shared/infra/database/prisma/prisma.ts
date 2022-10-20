import { PrismaClient } from '@prisma/client';
export class Connection {
  static getInstance() {
    const prisma = new PrismaClient();
    return prisma;
  }
}

export * from '@prisma/client';
