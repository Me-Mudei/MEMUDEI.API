import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from '#shared/domain';
import { PropertyRelationship } from '../entities';

export type PropertyRelationshipFilter = string;

export class PropertyRelationshipSearchParams extends DefaultSearchParams<PropertyRelationshipFilter> {}

export class PropertyRelationshipSearchResult extends DefaultSearchResult<
  PropertyRelationship,
  PropertyRelationshipFilter
> {}

export type PropertyRelationshipRepository = SearchableRepositoryInterface<
  PropertyRelationship,
  PropertyRelationshipFilter,
  PropertyRelationshipSearchParams,
  PropertyRelationshipSearchResult
>;
