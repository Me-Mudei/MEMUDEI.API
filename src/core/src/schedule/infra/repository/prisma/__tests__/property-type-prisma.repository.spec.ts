import { UniqueEntityId } from '../../../../../shared/domain';
import { Connection, PrismaClient } from '../../../../../shared/infra/database';
import { PropertyTypePrismaRepository } from '../property-type-prisma.repository';

describe('PropertyTypeRepository Unit tests', () => {
  let prisma: PrismaClient;

  beforeEach(() => {
    prisma = Connection.getInstance();
  });
  it('should find by id a property type', async () => {
    const propertyTypeRepository = new PropertyTypePrismaRepository(prisma);
    const propertyType = await propertyTypeRepository.findById(
      new UniqueEntityId('cboem1-PrEcw8tj_6P9Fg'),
    );
    expect(propertyType).toBeDefined();
  });
});
