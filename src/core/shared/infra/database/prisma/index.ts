import { PrismaClient } from "@prisma/client";
export default class PrismaConnection {
  static getInstance() {
    const prisma = new PrismaClient();
    return prisma;
  }
}
