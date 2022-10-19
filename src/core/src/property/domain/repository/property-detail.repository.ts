import { UniqueEntityId } from '../../../shared/domain';
import { PropertyDetail } from '../entities';

export interface PropertyDetailRepository {
  findManyByIds(ids: string[] | UniqueEntityId[]): Promise<PropertyDetail[]>;
}
