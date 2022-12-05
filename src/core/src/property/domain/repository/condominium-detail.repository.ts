import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from '#shared/domain';
import { CondominiumDetail } from '../entities';

export type CondominiumDetailFilter = string;

export class CondominiumDetailSearchParams extends DefaultSearchParams<CondominiumDetailFilter> {}

export class CondominiumDetailSearchResult extends DefaultSearchResult<
  CondominiumDetail,
  CondominiumDetailFilter
> {}

export type CondominiumDetailRepository = SearchableRepositoryInterface<
  CondominiumDetail,
  CondominiumDetailFilter,
  CondominiumDetailSearchParams,
  CondominiumDetailSearchResult
>;
