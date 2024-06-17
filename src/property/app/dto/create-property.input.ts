import { PropertyStatus, PropertyType, DetailType } from "../../domain";

export interface CreatePropertyInput {
  title: string;
  description: string;
  created_by_id: string;
  merchant_id: string;
  status?: PropertyStatus;
  address: AddressInput;
  property_type: PropertyType;
  details: DetailInput[];
  media?: MediaInput[];
}

export interface AddressInput {
  zip_code: string;
  city: string;
  state: string;
  street: string;
  country: string;
  location: LocationInput;
  district?: string;
  complement?: string;
}

export interface LocationInput {
  lat: number;
  lng: number;
}

export interface DetailInput {
  key: string;
  type: DetailType;
  available?: boolean;
  value?: number;
  unit?: string;
}

export interface FileInput {
  external_id: string;
  url: string;
  name: string;
  type: string;
  subtype: string;
}
export interface MediaInput {
  file: FileInput;
  position: number;
  description?: string;
}
