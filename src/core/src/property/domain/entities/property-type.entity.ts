import { Entity, UniqueEntityId } from '../../../shared/domain';

export type PropertyTypeProps = {
  id?: UniqueEntityId;
  created_at?: Date;
  updated_at?: Date;
};

export class PropertyType extends Entity<PropertyTypeProps> {
  constructor(props: PropertyTypeProps) {
    super(props);
  }
}
