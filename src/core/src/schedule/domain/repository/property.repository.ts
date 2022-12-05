import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from '#shared/domain';
import { Property } from '../entities';

export type PropertyFilter = string;

export class PropertySearchParams extends DefaultSearchParams<PropertyFilter> {}

export class PropertySearchResult extends DefaultSearchResult<
  Property,
  PropertyFilter
> {}

export type PropertyRepository = SearchableRepositoryInterface<
  Property,
  PropertyFilter,
  PropertySearchParams,
  PropertySearchResult
>;
