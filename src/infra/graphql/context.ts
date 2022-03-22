import { PrismaClient } from '@prisma/client';

export default class Context {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
}
