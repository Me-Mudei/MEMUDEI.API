import { PropertyStatus } from '../../domain/entities';

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
