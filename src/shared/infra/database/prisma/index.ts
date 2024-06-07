import { PrismaClient } from "@prisma/client";
import { PrismockClient } from "prismock";
export class Connection {
  private static vendor: string;
  private static instance: PrismaClient;
  static getInstance(vendor: string = "prisma"): PrismaClient {
    if (
      vendor === "prisma" &&
      (!Connection.instance || Connection.vendor !== vendor)
    ) {
      Connection.instance = new PrismaClient({ log: ["error"] });
    }
    if (
      vendor === "prismock" &&
      (!Connection.instance || Connection.vendor !== vendor)
    ) {
      Connection.instance = new PrismockClient();
    }
    Connection.vendor = vendor;
    return Connection.instance;
  }
}

export * from "@prisma/client";
