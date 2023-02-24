import { Property, PropertyStatus } from '../../domain/entities';

export type PropertyOutput = {
  id: string;
  status: PropertyStatus;
  created_at: Date;
  updated_at: Date;
};

export class PropertyOutputMapper {
  static toOutput(property: any): PropertyOutput {
    return {
      id: property.id,
      status: property.status,
      created_at: property.created_at,
      updated_at: property.updated_at,
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
  name: string;
  quantity: number;
  unit?: string;
};

export type PropertyPropertyDetailOutput = {
  id: string;
  name: string;
  description?: string;
  available: boolean;
};

export type PropertyCondominiumDetailOutput = {
  id: string;
  name: string;
  description?: string;
  available: boolean;
};

export type PropertyRuleOutput = {
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
