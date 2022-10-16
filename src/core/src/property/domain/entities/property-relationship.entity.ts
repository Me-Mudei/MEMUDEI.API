import { Entity, UniqueEntityId } from '../../../shared/domain';

export type PropertyRelationshipProps = {
  id?: UniqueEntityId;
  created_at?: Date;
  updated_at?: Date;
};

export class PropertyRelationship extends Entity<PropertyRelationshipProps> {
  constructor(props: PropertyRelationshipProps) {
    super(props);
  }
}
