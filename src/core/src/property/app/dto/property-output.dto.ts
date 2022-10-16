import { PropertyStatus } from '../../domain/entities';

export type PropertyOutput = {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  status: PropertyStatus;
  address: AddressOutput;
  property_type: PropertyTypeOutput;
  property_relationship: PropertyRelationshipOutput;
  privacy_type: PrivacyTypeOutput;
  floor_plan: FloorPlanOutput;
  schedule: ScheduleOutput;
  property_details: PropertyDetailOutput[];
  condominium_details: CondominiumDetailOutput[];
  rules: RuleOutput[];
  photos: PhotoOutput[];
  charges: ChargeOutput[];
  reports?: ReportOutput[];
  disabled_at?: Date;
  deleted_at?: Date;
};

export type AddressOutput = {
  id: string;
  created_at: string;
  updated_at: string;
};

export type PropertyTypeOutput = {
  id: string;
  created_at: string;
  updated_at: string;
};

export type PropertyRelationshipOutput = {
  id: string;
  created_at: string;
  updated_at: string;
};

export type PrivacyTypeOutput = {
  id: string;
  created_at: string;
  updated_at: string;
};

export type FloorPlanOutput = {
  id: string;
  created_at: string;
  updated_at: string;
};

export type ScheduleOutput = {
  id: string;
  created_at: string;
  updated_at: string;
};

export type PropertyDetailOutput = {
  id: string;
  created_at: string;
  updated_at: string;
};

export type CondominiumDetailOutput = {
  id: string;
  created_at: string;
  updated_at: string;
};

export type RuleOutput = {
  id: string;
  created_at: string;
  updated_at: string;
};

export type PhotoOutput = {
  id: string;
  created_at: string;
  updated_at: string;
};

export type ChargeOutput = {
  id: string;
  created_at: string;
  updated_at: string;
};

export type ReportOutput = {
  id: string;
  created_at: string;
  updated_at: string;
};
