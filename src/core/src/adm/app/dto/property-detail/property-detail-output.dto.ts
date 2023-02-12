import { PropertyDetail } from '../../../domain';

export type PropertyDetailOutput = {
  id: string;
  name: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
};

export class PropertyDetailOutputMapper {
  static toOutput(entity: PropertyDetail): PropertyDetailOutput {
    return entity.toJSON();
  }
}
