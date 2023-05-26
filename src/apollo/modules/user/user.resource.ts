import { mutationField, nonNull, queryField } from 'nexus';

export const CreateUser = mutationField('create_user', {
  type: 'user_output',
  args: { input: nonNull('create_user_input') },
  resolve: async (_, { input }, ctx) => {
    return await ctx.userService.createUser(input);
  },
});

export const ValidateUser = queryField('validate_user', {
  type: 'validate_user_output',
  args: { input: nonNull('validate_user_input') },
  resolve: async (_, _args, _ctx) => {
    //return await ctx.userService.validateUser(input);
    return {
      already_exists: false,
    };
  },
});
