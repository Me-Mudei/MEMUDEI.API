import { Entity, UniqueEntityId } from '../../../shared/domain';

export type CondominiumDetailProps = {
  id?: UniqueEntityId;
  created_at?: Date;
  updated_at?: Date;
};

export class CondominiumDetail extends Entity<CondominiumDetailProps> {
  constructor(props: CondominiumDetailProps) {
    super(props);
  }
}
