import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from '../../../shared/domain';
import { Property } from '../entities';

export namespace PropertyRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<Property, Filter> {}

  export type Repository = SearchableRepositoryInterface<
    Property,
    Filter,
    SearchParams,
    SearchResult
  >;
}

export default PropertyRepository;
