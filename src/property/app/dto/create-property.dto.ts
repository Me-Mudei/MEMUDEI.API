import { PropertyStatus } from "../../domain/entities";

export type CreatePropertyInput = {
  title: string;
  description: string;
  status?: PropertyStatus;
  address: AddressInput;
  property_type: string;
  property_relationship: string;
  privacy_type: string;
  floor_plans: FloorPlanInput[];
  property_details: PropertyDetailInput[];
  condominium_details: CondominiumDetailInput[];
  rules: RuleInput[];
  photos?: PhotoInput[];
  charges: ChargeInput[];
  user_id: string;
};

export type AddressInput = {
  zip_code: string;
  city: string;
  state: string;
  street: string;
  country: string;
  location: LocationInput;
  district?: string;
  complement?: string;
};

export type LocationInput = {
  lat: number;
  lng: number;
};

export type FloorPlanInput = {
  key: string;
  value: number;
};

export type PropertyDetailInput = {
  key: string;
  available: boolean;
};

export type CondominiumDetailInput = {
  key: string;
  available: boolean;
};

export type RuleInput = {
  key: string;
  allowed: boolean;
};

export type ChargeInput = {
  key: string;
  amount: number;
};

export type PhotoInput = {
  url: string;
  filename: string;
  type: string;
  subtype: string;
  position: number;
  description?: string;
};
