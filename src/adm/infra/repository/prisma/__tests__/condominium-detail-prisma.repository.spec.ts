import { UniqueEntityId } from "#shared/domain";
import { Connection, PrismaClient } from "#shared/infra";

import { CondominiumDetailPrismaRepository } from "../condominium-detail-prisma.repository";

describe("CondominiumDetailRepository Unit tests", () => {
  let prisma: PrismaClient;

  beforeEach(() => {
    prisma = Connection.getInstance();
  });
  it("should find by many ids a condominium detail", async () => {
    const condominiumDetailRepository = new CondominiumDetailPrismaRepository(
      prisma,
    );
    const condominiumDetails = await condominiumDetailRepository.findManyById([
      new UniqueEntityId("p9bw4jiqH7Weh84d19Dk1"),
    ]);
    expect(condominiumDetails.length).toBe(1);
  });
});
