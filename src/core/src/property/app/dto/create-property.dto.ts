import { PropertyStatus } from '../../domain/entities';

export type CreatePropertyInput = {
  title: string;
  description: string;
  status?: PropertyStatus;
  address: AddressInput;
  property_type_id: string;
  property_relationship_id: string;
  privacy_type_id: string;
  //schedule: ScheduleInput;
  floor_plans: FloorPlanInput[];
  property_details: PropertyDetailInput[];
  condominium_details: CondominiumDetailInput[];
  rules: RuleInput[];
  photos: PhotoInput[];
  charges: ChargeInput[];
};

export type AddressInput = {
  zip_code: string;
  city: string;
  state: string;
  street: string;
  district: string;
  complement?: string;
};

export type FloorPlanInput = {
  name: string;
  quantity: number;
  unit?: string;
};

export type ScheduleInput = {
  id: string;
  created_at: Date;
  updated_at: Date;
};

export type PropertyDetailInput = {
  id: string;
  available: boolean;
};

export type CondominiumDetailInput = {
  id: string;
  available: boolean;
};

export type RuleInput = {
  id: string;
  allowed: boolean;
};

export type PhotoInput = {
  url: string;
  file: string;
  name: string;
  type: string;
  subtype: string;
  description?: string;
};

export type ChargeInput = {
  name: string;
  amount: number;
};
