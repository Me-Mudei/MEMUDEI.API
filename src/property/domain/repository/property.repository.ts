import {
  SearchableRepositoryInterface,
  SearchParams,
  SearchResult
} from "#shared/domain";

import { Property } from "../entities";

export type PropertyFilter = {
  id?: string;
  query?: string;
  status?: string;
  property_type?: string;
  privacy_type?: string;
  property_details?: string[];
  condominium_details?: string[];
  rules?: string[];
  lat?: number;
  lng?: number;
  radius?: number;
  value_type?: string;
  min_value?: number;
  max_value?: number;
  min_footage?: number;
  max_footage?: number;
  qtd_bedrooms?: number;
  qtd_bathrooms?: number;
} | null;

export class PropertySearchParams extends SearchParams<PropertyFilter> {}

export class PropertySearchResult extends SearchResult<
  Property,
  PropertyFilter
> {}

export type PropertyRepository = SearchableRepositoryInterface<
  Property,
  PropertyFilter,
  PropertySearchParams,
  PropertySearchResult
>;
