import { Entity, UniqueEntityId } from '../../../shared/domain';

export type PrivacyTypeProps = {
  id?: UniqueEntityId;
  created_at?: Date;
  updated_at?: Date;
};

export class PrivacyType extends Entity<PrivacyTypeProps> {
  constructor(props: PrivacyTypeProps) {
    super(props);
  }
}
