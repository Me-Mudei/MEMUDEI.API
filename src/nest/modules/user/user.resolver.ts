import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserOutput } from './dto/user.output';
import { CreateUserInput } from './dto/user.input';
import { UserFacade } from '#user/app';

@Resolver(() => UserOutput)
export class UserResolver {
  constructor(private readonly userFacade: UserFacade) {}
  @Query(() => UserOutput)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userFacade.findFirstUser({});
  }

  @Mutation(() => UserOutput)
  createUser(@Args('input') input: CreateUserInput) {
    return this.userFacade.createUser(input);
  }
}
