import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult
} from "#shared/domain";

import { Rule } from "../entities";

export type RuleFilter = string;

export class RuleSearchParams extends DefaultSearchParams<RuleFilter> {}

export class RuleSearchResult extends DefaultSearchResult<Rule, RuleFilter> {}

export type RuleRepository = SearchableRepositoryInterface<
  Rule,
  RuleFilter,
  RuleSearchParams,
  RuleSearchResult
>;
