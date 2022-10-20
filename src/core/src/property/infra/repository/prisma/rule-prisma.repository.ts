import { NotFoundError, UniqueEntityId } from '../../../../shared/domain';
import { Rule, RuleRepository } from '../../../domain';
import { PrismaClient } from '../../../../shared/infra/database';

export class RulePrismaRepository implements RuleRepository {
  constructor(readonly prisma: PrismaClient) {}

  async findManyByIds(ids: string[] | UniqueEntityId[]): Promise<Rule[]> {
    const rulesDatabase = await this.prisma.rule.findMany({
      where: {
        id: {
          in: ids.map((id) => `${id}`),
        },
      },
    });
    ids.map((id) => {
      if (!rulesDatabase.find((c) => c.id === `${id}`)) {
        throw new NotFoundError(`Rule Not Found using ID ${id}`);
      }
    });
    const rules = rulesDatabase.map(
      (rule) =>
        new Rule({
          id: new UniqueEntityId(rule.id),
          name: rule.name,
          description: rule.description,
          created_at: rule.created_at,
          updated_at: rule.updated_at,
        }),
    );
    return rules;
  }
}
