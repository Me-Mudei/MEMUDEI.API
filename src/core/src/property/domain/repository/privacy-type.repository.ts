import { UniqueEntityId } from '../../../shared/domain';
import { PrivacyType } from '../entities';

export interface PrivacyTypeRepository {
  findById(id: string | UniqueEntityId): Promise<PrivacyType>;
}
