import { PrismaClient } from '@prisma/client';

export default class Context {
  db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }
}
