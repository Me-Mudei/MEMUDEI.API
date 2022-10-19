import { UniqueEntityId } from '../../../shared/domain';
import { PropertyType } from '../entities';

export interface PropertyTypeRepository {
  findById(id: string | UniqueEntityId): Promise<PropertyType>;
}
