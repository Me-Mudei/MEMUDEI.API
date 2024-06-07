import { Prisma } from "@prisma/client";
import {
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from "#shared/domain";

import { User } from "./user.entity";

export type UserFilter = Prisma.UserWhereInput;

export class UserSearchParams extends DefaultSearchParams<UserFilter> {}

export class UserSearchResult extends DefaultSearchResult<User, UserFilter> {}
