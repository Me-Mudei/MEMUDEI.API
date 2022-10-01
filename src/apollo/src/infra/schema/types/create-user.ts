import { extendType, inputObjectType, nonNull, objectType } from 'nexus';
import { isAdmin } from '../rules';

export const createUserInput = inputObjectType({
  name: 'create_user_input',
  definition(t) {
    t.nonNull.string('email');
    t.nonNull.string('name');
    t.nonNull.string('role_name');
  },
});

export const createUserOutput = objectType({
  name: 'user_output',
  definition(t) {
    t.int('status');
    t.string('message');
  },
});

export const userMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('create_user', {
      type: 'user_output',
      shield: isAdmin(),
      args: {
        input: nonNull('create_user_input'),
      },
      resolve: async (_, { input }, ctx) => {
        await ctx.user.createUser(input);
        return {
          status: 200,
          message: 'User created',
        };
      },
    });
  },
});
