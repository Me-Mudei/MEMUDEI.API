import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult
} from "#shared/domain";

import { PropertyType } from "../entities";

export type PropertyTypeFilter = string;

export class PropertyTypeSearchParams extends DefaultSearchParams<PropertyTypeFilter> {}

export class PropertyTypeSearchResult extends DefaultSearchResult<
  PropertyType,
  PropertyTypeFilter
> {}

export type PropertyTypeRepository = SearchableRepositoryInterface<
  PropertyType,
  PropertyTypeFilter,
  PropertyTypeSearchParams,
  PropertyTypeSearchResult
>;
