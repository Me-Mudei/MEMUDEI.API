import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from '#shared/domain';
import { Schedule } from '../entities';

export type ScheduleFilter = string;

export class ScheduleSearchParams extends DefaultSearchParams<ScheduleFilter> {}

export class ScheduleSearchResult extends DefaultSearchResult<
  Schedule,
  ScheduleFilter
> {}

export type ScheduleRepository = SearchableRepositoryInterface<
  Schedule,
  ScheduleFilter,
  ScheduleSearchParams,
  ScheduleSearchResult
>;
