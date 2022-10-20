import { Property, PropertyStatus } from '../../domain/entities';

export type PropertyOutput = {
  id: string;
  title: string;
  description: string;
  status: PropertyStatus;
  address: AddressOutput;
  property_type: PropertyTypeOutput;
  property_relationship: PropertyRelationshipOutput;
  privacy_type: PrivacyTypeOutput;
  //schedule: ScheduleOutput;
  floor_plans: FloorPlanOutput[];
  property_details: PropertyDetailOutput[];
  condominium_details: CondominiumDetailOutput[];
  rules: RuleOutput[];
  photos: PhotoOutput[];
  charges: ChargeOutput[];
  created_at: Date;
  updated_at: Date;
};

export class PropertyOutputMapper {
  static toOutput(property: Property): PropertyOutput {
    return {
      id: property.id,
      title: property.title,
      description: property.description,
      status: property.status,
      created_at: property.created_at,
      updated_at: property.updated_at,
      address: {
        id: property.address.id,
        zip_code: property.address.zip_code,
        city: property.address.city,
        state: property.address.state,
        street: property.address.street,
        district: property.address.district,
        complement: property.address.complement,
      },
      property_type: {
        id: property.property_type.id,
        name: property.property_type.name,
      },
      property_relationship: {
        id: property.property_relationship.id,
        name: property.property_relationship.name,
      },
      privacy_type: {
        id: property.privacy_type.id,
        name: property.privacy_type.name,
      },
      floor_plans: property.floor_plans.map((floorPlan) => ({
        id: floorPlan.id,
        name: floorPlan.name,
        quantity: floorPlan.quantity,
        unit: floorPlan.unit,
      })),
      property_details: property.property_details.map((propertyDetail) => ({
        id: propertyDetail.id,
        name: propertyDetail.name,
        available: propertyDetail.available,
      })),
      condominium_details: property.condominium_details.map(
        (condominiumDetail) => ({
          id: condominiumDetail.id,
          name: condominiumDetail.name,
          available: condominiumDetail.available,
        }),
      ),
      rules: property.rules.map((rule) => ({
        id: rule.id,
        name: rule.name,
        allowed: rule.allowed,
      })),
      photos: property.photos.map((photo) => ({
        id: photo.id,
        description: photo.description,
        file: photo.file,
        name: photo.name,
        type: photo.type,
        subtype: photo.subtype,
        url: photo.url,
      })),
      charges: property.charges.map((charge) => ({
        id: charge.id,
        name: charge.name,
        amount: charge.amount,
      })),
    };
  }
}

export type AddressOutput = {
  id: string;
  zip_code: string;
  city: string;
  state: string;
  street: string;
  district: string;
  complement?: string;
};

export type PropertyTypeOutput = {
  id: string;
  name: string;
  description?: string;
};

export type PropertyRelationshipOutput = {
  id: string;
  name: string;
  description?: string;
};

export type PrivacyTypeOutput = {
  id: string;
  name: string;
  description?: string;
};

export type FloorPlanOutput = {
  id: string;
  name: string;
  quantity: number;
  unit?: string;
};

export type ScheduleOutput = {
  id: string;
};

export type PropertyDetailOutput = {
  id: string;
  name: string;
  description?: string;
  available: boolean;
};

export type CondominiumDetailOutput = {
  id: string;
  name: string;
  description?: string;
  available: boolean;
};

export type RuleOutput = {
  id: string;
  name: string;
  description?: string;
  allowed: boolean;
};

export type PhotoOutput = {
  id: string;
  url: string;
  file: string;
  name: string;
  type: string;
  subtype: string;
  description?: string;
};

export type ChargeOutput = {
  id: string;
  name: string;
  amount: number;
};

export type ReportOutput = {
  id: string;
};
