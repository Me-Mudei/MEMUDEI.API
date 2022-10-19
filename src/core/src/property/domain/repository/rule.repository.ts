import { UniqueEntityId } from '../../../shared/domain';
import { Rule } from '../entities';

export interface RuleRepository {
  findManyByIds(ids: string[] | UniqueEntityId[]): Promise<Rule[]>;
}
