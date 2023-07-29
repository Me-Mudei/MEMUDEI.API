import { mutationField, nonNull, nullable, queryField } from "nexus";

import { canCreateUser } from "./rules";

export const CreateUser = mutationField("create_user", {
  type: "user_output",
  shield: canCreateUser(),
  args: { input: nonNull("create_user_input") },
  resolve: async (_, { input }, ctx) => {
    return await ctx.userService.createUser(input);
  }
});

export const CreateUserByAuth = mutationField("create_user_by_auth", {
  type: "user_output",
  args: { input: nonNull("create_user_by_auth_input") },
  resolve: async (_, { input }, ctx) => {
    return await ctx.userService.createUser(input);
  }
});

export const SearchUsers = queryField("search_users", {
  type: "users_pagination_output",
  //shield: canSearchUser(),
  args: { input: nullable("search_users_input") },
  resolve: async (_, { input }, ctx) => {
    const res = ctx.userService.searchUsers(input);
    console.log("res", res);
    return res;
  }
});

export const ValidateUser = queryField("validate_user", {
  type: "validate_user_output",
  args: { input: nonNull("validate_user_input") },
  resolve: async (_, { input }, ctx) => {
    return await ctx.userService.validateUser(input);
  }
});
