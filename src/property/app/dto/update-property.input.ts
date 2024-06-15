import { PropertyStatus, PropertyType } from "../../domain";

import {
  AddressInput,
  DetailInput,
  MediaInput,
  LocationInput,
} from "./create-property.input";

export interface UpdatePropertyInput {
  id: string;
  title?: string;
  description?: string;
  status?: PropertyStatus;
  property_type?: PropertyType;
  address?: AddressUpdateInput;
  details?: DetailUpdateInput;
  media?: MediaUpdateInput;
}

export interface LocationUpdateInput extends Partial<LocationInput> {}

export interface AddressUpdateInput
  extends Partial<Omit<AddressInput, "location">> {
  location?: LocationUpdateInput;
}

export interface DetailUpdateInput {
  remove?: string[];
  update?: Omit<DetailInput, "type">[];
  insert?: DetailInput[];
}
export interface MediaUpdateInput {
  remove?: string[];
  update?: Array<Partial<Omit<MediaInput, "file">> & { file_id: string }>;
  insert?: MediaInput[];
}
