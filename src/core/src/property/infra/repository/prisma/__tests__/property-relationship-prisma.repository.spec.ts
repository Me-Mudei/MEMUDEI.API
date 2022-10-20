import { UniqueEntityId } from '../../../../../shared/domain';
import { Connection, PrismaClient } from '../../../../../shared/infra/database';
import { PropertyRelationshipPrismaRepository } from '../property-relationship-prisma.repository';

describe('PropertyRelationshipRepository Unit tests', () => {
  let prisma: PrismaClient;

  beforeEach(() => {
    prisma = Connection.getInstance();
  });
  it('should find by id a property relationship', async () => {
    const propertyRelationshipRepository =
      new PropertyRelationshipPrismaRepository(prisma);
    const propertyRelationship = await propertyRelationshipRepository.findById(
      new UniqueEntityId('PlbanfKdJxilsSyTzEaKS'),
    );
    expect(propertyRelationship).toBeDefined();
  });
});
