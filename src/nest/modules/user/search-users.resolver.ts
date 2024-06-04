import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserFacade } from '#user/app';
import { PaginateUsersOutput } from './dto/paginate-users.output';
import { SearchUsersInput } from './dto/search-users.input';

@Resolver(() => PaginateUsersOutput)
export class SearchUsersResolver {
  constructor(private readonly userFacade: UserFacade) {}

  @Query(() => PaginateUsersOutput)
  searchUsers(@Args('input') input: SearchUsersInput) {
    return this.userFacade.searchUsers(input);
  }
}
