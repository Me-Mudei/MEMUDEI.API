import { mutationField, nonNull } from 'nexus';

export const CreateUser = mutationField('create_user', {
  type: 'user_output',
  args: { input: nonNull('create_user_input') },
  resolve: async (_, { input }, ctx) => {
    console.log('input', input);
    return await ctx.userService.createUser(input);
  },
});
