import { PropertyType } from '../../../domain';

export type PropertyTypeOutput = {
  id: string;
  key: string;
  name: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
};

export class PropertyTypeOutputMapper {
  static toOutput(entity: PropertyType): PropertyTypeOutput {
    return entity.toJSON();
  }
}
