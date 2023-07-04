import { mutationField, nonNull, nullable, queryField } from 'nexus';

export const CreateUser = mutationField('create_user', {
  type: 'user_output',
  args: { input: nonNull('create_user_input') },
  resolve: async (_, { input }, ctx) => {
    return await ctx.userService.createUser(input);
  },
});

export const SearchUsers = queryField('search_users', {
  type: 'users_pagination_output',
  args: { input: nullable('search_users_input') },
  resolve: async (_, { input }, ctx) => {
    return ctx.userService.searchUsers(input);
  },
});

export const ValidateUser = queryField('validate_user', {
  type: 'validate_user_output',
  args: { input: nonNull('validate_user_input') },
  resolve: async (_, { input }, ctx) => {
    return await ctx.userService.validateUser(input);
  },
});
