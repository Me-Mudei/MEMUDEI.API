import { UniqueEntityId } from '../../../shared/domain';
import { CondominiumDetail } from '../entities';

export interface CondominiumDetailRepository {
  findManyByIds(ids: string[] | UniqueEntityId[]): Promise<CondominiumDetail[]>;
}
