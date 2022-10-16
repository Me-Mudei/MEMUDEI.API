import { Entity, UniqueEntityId } from '../../../shared/domain';

export type AddressProps = {
  id?: UniqueEntityId;
  created_at?: Date;
  updated_at?: Date;
};

export class Address extends Entity<AddressProps> {
  constructor(props: AddressProps) {
    super(props);
  }
}
