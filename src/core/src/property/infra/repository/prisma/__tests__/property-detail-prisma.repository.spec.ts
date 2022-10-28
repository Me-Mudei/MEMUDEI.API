import { UniqueEntityId } from '../../../../../shared/domain';
import { Connection, PrismaClient } from '../../../../../shared/infra/database';
import { PropertyDetailPrismaRepository } from '../property-detail-prisma.repository';

describe('PropertyDetailRepository Unit tests', () => {
  let prisma: PrismaClient;

  beforeEach(() => {
    prisma = Connection.getInstance();
  });
  it('should find by many ids a property detail', async () => {
    const propertyDetailRepository = new PropertyDetailPrismaRepository(prisma);
    const propertyDetails = await propertyDetailRepository.findManyById([
      new UniqueEntityId('PIpRG6rRuZFNIEtBsYdyT'),
    ]);
    expect(propertyDetails.length).toBe(1);
  });
});
