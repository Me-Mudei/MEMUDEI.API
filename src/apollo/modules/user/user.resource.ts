import { mutationField, nonNull } from 'nexus';
import { isAdmin } from '../shared/rules';

export const CreateUser = mutationField('create_user', {
  type: 'user_output',
  shield: isAdmin(),
  args: { input: nonNull('create_user_input') },
  resolve: async (_, { input }, ctx) => {
    return await ctx.userService.createUser(input);
  },
});
