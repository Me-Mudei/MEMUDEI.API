import { UniqueEntityId } from '../../../../../shared/domain';
import { Prisma, PrismaClient } from '../../../../../shared/infra/database';
import { RulePrismaRepository } from '../rule-prisma.repository';

describe('RuleRepository Unit tests', () => {
  let prisma: PrismaClient;

  beforeEach(() => {
    prisma = Prisma.getInstance();
  });
  it('should find by many ids a rule', async () => {
    const ruleRepository = new RulePrismaRepository(prisma);
    const rules = await ruleRepository.findManyByIds([
      new UniqueEntityId('MgxO159FtDCCYQYULEhBy'),
    ]);
    expect(rules.length).toBe(1);
  });
});
