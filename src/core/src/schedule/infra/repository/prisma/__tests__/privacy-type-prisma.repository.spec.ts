import { UniqueEntityId } from '../../../../../shared/domain';
import { Connection, PrismaClient } from '../../../../../shared/infra/database';
import { PrivacyTypePrismaRepository } from '../privacy-type-prisma.repository';

describe('PrivacyTypeRepository Unit tests', () => {
  let prisma: PrismaClient;

  beforeEach(() => {
    prisma = Connection.getInstance();
  });
  it('should find by id a privacy type', async () => {
    const privacyTypeRepository = new PrivacyTypePrismaRepository(prisma);
    const privacyType = await privacyTypeRepository.findById(
      new UniqueEntityId('ELhZHy9eDfTYAPY-b6PD3'),
    );
    expect(privacyType).toBeDefined();
  });
});
