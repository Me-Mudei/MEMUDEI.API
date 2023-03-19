import { PrismaClient } from '@prisma/client';
export class Connection {
  private static instance: PrismaClient;
  static getInstance() {
    if (!Connection.instance) {
      Connection.instance = new PrismaClient({
        log: ['error'],
      });
    }
    return Connection.instance;
  }
}

export * from '@prisma/client';
