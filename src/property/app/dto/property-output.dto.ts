import { PropertyStatus } from "../../domain/entities";

export type CreatePropertyOutput = {
  id: string;
  status: PropertyStatus;
  created_at: Date;
  updated_at: Date;
};

export type UpdatePropertyOutput = CreatePropertyOutput;

export class CreatePropertyOutputMapper {
  static toOutput(property: any): CreatePropertyOutput {
    return {
      id: property.id,
      status: property.status,
      created_at: property.created_at,
      updated_at: property.updated_at
    };
  }
}

export class UpdatePropertyOutputMapper {
  static toOutput(property: any): UpdatePropertyOutput {
    return CreatePropertyOutputMapper.toOutput(property);
  }
}

export type PropertyOutput = {
  id: string;
  title: string;
  description: string;
  status: PropertyStatus;
  address: AddressOutput;
  property_type: string;
  property_relationship: string;
  privacy_type: string;
  floor_plans: FloorPlanOutput[];
  property_details: PropertyPropertyDetailOutput[];
  condominium_details: PropertyCondominiumDetailOutput[];
  rules: PropertyRuleOutput[];
  photos: PhotoOutput[];
  charges: ChargeOutput[];
  created_at: Date;
  updated_at: Date;
};

export class PropertyOutputMapper {
  static toOutput(property: any): PropertyOutput {
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
        complement: property.address.complement
      },
      property_type: property.property_type,
      property_relationship: property.property_relationship,
      privacy_type: property.privacy_type,
      floor_plans: property.floor_plans.map((floorPlan) => ({
        id: floorPlan.id,
        key: floorPlan.key,
        name: floorPlan.name,
        value: floorPlan.value,
        unit: floorPlan.unit
      })),
      property_details: property.property_details.map((propertyDetail) => ({
        id: propertyDetail.id,
        key: propertyDetail.key,
        name: propertyDetail.name,
        available: propertyDetail.available,
        description: propertyDetail.description
      })),
      condominium_details: property.condominium_details.map(
        (condominiumDetail) => ({
          id: condominiumDetail.id,
          key: condominiumDetail.key,
          name: condominiumDetail.name,
          available: condominiumDetail.available,
          description: condominiumDetail.description
        })
      ),
      rules: property.rules.map((rule) => ({
        id: rule.id,
        key: rule.key,
        name: rule.name,
        allowed: rule.allowed,
        description: rule.description
      })),
      charges: property.charges.map((charge) => ({
        id: charge.id,
        key: charge.key,
        name: charge.name,
        amount: charge.amount,
        description: charge.description
      })),
      photos: property.photos.map((photo) => ({
        id: photo.id,
        description: photo.description,
        file: photo.file,
        name: photo.name,
        type: photo.type,
        subtype: photo.subtype,
        url: photo.url
      }))
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

export type FloorPlanOutput = {
  id: string;
  key: string;
  name: string;
  value: number;
  unit?: string;
};

export type PropertyPropertyDetailOutput = {
  id: string;
  key: string;
  name: string;
  description?: string;
  available: boolean;
};

export type PropertyCondominiumDetailOutput = {
  id: string;
  key: string;
  name: string;
  description?: string;
  available: boolean;
};

export type PropertyRuleOutput = {
  id: string;
  key: string;
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
  key: string;
  name: string;
  amount: number;
  description?: string;
};
