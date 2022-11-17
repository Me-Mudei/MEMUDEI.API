import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from '../../../shared/domain';
import { User } from '../entities';

export type UserFilter = string;

export class UserSearchParams extends DefaultSearchParams<UserFilter> {}

export class UserSearchResult extends DefaultSearchResult<User, UserFilter> {}

export type UserRepository = SearchableRepositoryInterface<
  User,
  UserFilter,
  UserSearchParams,
  UserSearchResult
>;
