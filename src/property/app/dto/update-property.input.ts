import { PropertyStatus, PropertyType } from "../../domain";

import {
  AddressInput,
  DetailInput,
  FileInput,
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
  media?: FileUpdateInput;
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

export interface FileUpdateInput {
  remove?: string[];
  update?: Array<
    Partial<
      Omit<FileInput, "external_id" | "url" | "filename" | "type" | "subtype">
    > & {
      id: string;
    }
  >;
  insert?: FileInput[];
}
