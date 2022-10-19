import { UniqueEntityId } from '../../../shared/domain';
import { PropertyRelationship } from '../entities';

export interface PropertyRelationshipRepository {
  findById(id: string | UniqueEntityId): Promise<PropertyRelationship>;
}
