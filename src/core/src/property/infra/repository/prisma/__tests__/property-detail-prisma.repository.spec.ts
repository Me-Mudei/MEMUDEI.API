import { UniqueEntityId } from '../../../../../shared/domain';
import { Prisma, PrismaClient } from '../../../../../shared/infra/database';
import { PropertyDetailPrismaRepository } from '../property-detail-prisma.repository';

describe('PropertyDetailRepository Unit tests', () => {
  let prisma: PrismaClient;

  beforeEach(() => {
    prisma = Prisma.getInstance();
  });
  it('should find by many ids a property detail', async () => {
    const propertyDetailRepository = new PropertyDetailPrismaRepository(prisma);
    const propertyDetails = await propertyDetailRepository.findManyByIds([
      new UniqueEntityId('PIpRG6rRuZFNIEtBsYdyT'),
    ]);
    expect(propertyDetails.length).toBe(1);
  });
});
