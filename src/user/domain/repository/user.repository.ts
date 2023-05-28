import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from '#shared/domain';
import { User } from '../entities';

export type UserFilter = {
  id?: string;
  property_id?: string;
  external_id?: string;
  name?: string;
  email?: string;
};

export class UserSearchParams extends DefaultSearchParams<UserFilter> {}

export class UserSearchResult extends DefaultSearchResult<User, UserFilter> {}

export interface UserRepository
  extends SearchableRepositoryInterface<
    User,
    UserFilter,
    UserSearchParams,
    UserSearchResult
  > {
  findFirst(props: UserSearchParams): Promise<User | null>;
}
