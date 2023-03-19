import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from '#shared/domain';
import { Calendar } from '../entities';

export type CalendarFilter = string;

export class CalendarSearchParams extends DefaultSearchParams<CalendarFilter> {}

export class CalendarSearchResult extends DefaultSearchResult<
  Calendar,
  CalendarFilter
> {}

export type CalendarRepository = SearchableRepositoryInterface<
  Calendar,
  CalendarFilter,
  CalendarSearchParams,
  CalendarSearchResult
>;
