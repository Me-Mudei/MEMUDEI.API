import { Entity, UniqueEntityId } from '../../../shared/domain';

export type ChargeProps = {
  id?: UniqueEntityId;
  created_at?: Date;
  updated_at?: Date;
};

export class Charge extends Entity<ChargeProps> {
  constructor(props: ChargeProps) {
    super(props);
  }
}
