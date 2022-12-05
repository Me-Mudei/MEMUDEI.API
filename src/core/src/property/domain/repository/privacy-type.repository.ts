import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from '#shared/domain';
import { PrivacyType } from '../entities';

export type PrivacyTypeFilter = string;

export class PrivacyTypeSearchParams extends DefaultSearchParams<PrivacyTypeFilter> {}

export class PrivacyTypeSearchResult extends DefaultSearchResult<
  PrivacyType,
  PrivacyTypeFilter
> {}

export type PrivacyTypeRepository = SearchableRepositoryInterface<
  PrivacyType,
  PrivacyTypeFilter,
  PrivacyTypeSearchParams,
  PrivacyTypeSearchResult
>;
