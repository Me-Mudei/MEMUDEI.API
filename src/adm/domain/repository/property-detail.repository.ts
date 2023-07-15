import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult
} from "#shared/domain";

import { PropertyDetail } from "../entities";

export type PropertyDetailFilter = string;

export class PropertyDetailSearchParams extends DefaultSearchParams<PropertyDetailFilter> {}

export class PropertyDetailSearchResult extends DefaultSearchResult<
  PropertyDetail,
  PropertyDetailFilter
> {}

export type PropertyDetailRepository = SearchableRepositoryInterface<
  PropertyDetail,
  PropertyDetailFilter,
  PropertyDetailSearchParams,
  PropertyDetailSearchResult
>;
