import { PropertyFakeBuilder } from '#property/domain';
import { PrismaClient, Connection } from '#shared/infra';
import { PropertyPrismaRepository } from './property-prisma.repository';

describe('PropertyPrismaRepository', () => {
  let repository: PropertyPrismaRepository;
  let prisma: PrismaClient;

  beforeEach(() => {
    prisma = Connection.getInstance();
    repository = new PropertyPrismaRepository(prisma);
  });

  describe('Insert', () => {
    it('should insert a property', async () => {
      const property = PropertyFakeBuilder.aProperty().build();
      const result = await repository.insert(property);
      console.log(result);

      expect(result).toEqual(property);
    });
  });
});
