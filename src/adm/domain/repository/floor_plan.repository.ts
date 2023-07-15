import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult
} from "#shared/domain";

import { FloorPlan } from "../entities";

export type FloorPlanFilter = string;

export class FloorPlanSearchParams extends DefaultSearchParams<FloorPlanFilter> {}

export class FloorPlanSearchResult extends DefaultSearchResult<
  FloorPlan,
  FloorPlanFilter
> {}

export type FloorPlanRepository = SearchableRepositoryInterface<
  FloorPlan,
  FloorPlanFilter,
  FloorPlanSearchParams,
  FloorPlanSearchResult
>;
