import { Property, PropertyStatus, PropertyType } from "../../domain";

export interface PropertyOutput {
  id: string;
  title: string;
  description: string;
  status: PropertyStatus;
  property_type: PropertyType;
  created_at: Date;
  updated_at: Date;
}

export class PropertyOutputMapper {
  static toOutput(property: Property): PropertyOutput {
    return {
      id: property.id,
      title: property.title,
      description: property.description,
      status: property.status,
      property_type: property.property_type,
      created_at: property.created_at,
      updated_at: property.updated_at,
    };
  }
}
