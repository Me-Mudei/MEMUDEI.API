import { PropertyStatus } from "#property/domain";

import {
  ChargeInput,
  CondominiumDetailInput,
  FloorPlanInput,
  PhotoInput,
  PropertyDetailInput,
  RuleInput,
} from "./create-property.dto";

export type UpdatePropertyInput = {
  id: string;
  title?: string;
  description?: string;
  status?: PropertyStatus;
  address?: AddressUpdateInput;
  property_type?: string;
  property_relationship?: string;
  privacy_type?: string;
  floor_plan?: FloorPlanUpdateInput;
  property_detail?: PropertyDetailUpdateInput;
  condominium_detail?: CondominiumDetailUpdateInput;
  rule?: RuleUpdateInput;
  charge?: ChargeUpdateInput;
  photo?: PhotoUpdateInput;
  user_id?: string;
};

export type AddressUpdateInput = {
  zip_code?: string;
  city?: string;
  state?: string;
  street?: string;
  country?: string;
  location?: LocationUpdateInput;
  district?: string;
  complement?: string;
};

export type LocationUpdateInput = {
  lat?: number;
  lng?: number;
};

export type FloorPlanUpdateInput = {
  remove?: string[];
  update?: FloorPlanInput[];
  insert?: FloorPlanInput[];
};

export type PropertyDetailUpdateInput = {
  remove?: string[];
  update?: PropertyDetailInput[];
  insert?: PropertyDetailInput[];
};

export type CondominiumDetailUpdateInput = {
  remove?: string[];
  update?: CondominiumDetailInput[];
  insert?: CondominiumDetailInput[];
};

export type RuleUpdateInput = {
  remove?: string[];
  update?: RuleInput[];
  insert?: RuleInput[];
};

export type ChargeUpdateInput = {
  remove?: string[];
  update?: ChargeInput[];
  insert?: ChargeInput[];
};

export type PhotoUpdateInput = {
  remove?: string[];
  update?: PhotoUpdate[];
  insert?: PhotoInput[];
};

export type PhotoUpdate = {
  id: string;
  position: number;
  description?: string;
};
