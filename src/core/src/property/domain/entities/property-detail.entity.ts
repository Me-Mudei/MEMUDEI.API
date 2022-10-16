import { Entity, UniqueEntityId } from '../../../shared/domain';

export type PropertyDetailProps = {
  id?: UniqueEntityId;
  created_at?: Date;
  updated_at?: Date;
};

export class PropertyDetail extends Entity<PropertyDetailProps> {
  constructor(props: PropertyDetailProps) {
    super(props);
  }
}
