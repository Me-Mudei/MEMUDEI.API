import { PropertyRelationship } from '../../../domain';

export type PropertyRelationshipOutput = {
  id: string;
  name: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
};

export class PropertyRelationshipOutputMapper {
  static toOutput(entity: PropertyRelationship): PropertyRelationshipOutput {
    return entity.toJSON();
  }
}
