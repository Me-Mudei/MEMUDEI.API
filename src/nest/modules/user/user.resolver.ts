import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserOutput } from './dto/user.output';
import { CreateUserInput } from './dto/user.input';
import { UserFacade } from '#user/app';

@Resolver(() => UserOutput)
export class UserResolver {
  constructor(private readonly userFacade: UserFacade) {}
  @Mutation(() => UserOutput)
  createUser(@Args('input') input: CreateUserInput) {
    return this.userFacade.createUser(input);
  }
}
