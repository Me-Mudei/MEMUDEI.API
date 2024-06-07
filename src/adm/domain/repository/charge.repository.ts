import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from "#shared/domain";

import { Charge } from "../entities";

export type ChargeFilter = string;

export class ChargeSearchParams extends DefaultSearchParams<ChargeFilter> {}

export class ChargeSearchResult extends DefaultSearchResult<
  Charge,
  ChargeFilter
> {}

export type ChargeRepository = SearchableRepositoryInterface<
  Charge,
  ChargeFilter,
  ChargeSearchParams,
  ChargeSearchResult
>;
