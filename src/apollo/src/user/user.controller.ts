import { CreateUserInput, UserOutput } from './dto';
import { mutationField, nonNull } from 'nexus';
import { isAdmin } from '../shared/rules';

export const CreateUser = mutationField('create_user', {
  type: UserOutput,
  shield: isAdmin(),
  args: {
    input: nonNull(CreateUserInput),
  },
  resolve: async (_, { input }, ctx) => {
    await ctx.userService.createUser(input);
    return {
      status: 200,
      message: 'User created',
    };
  },
});
