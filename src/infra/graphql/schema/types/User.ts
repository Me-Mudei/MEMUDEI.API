import { extendType, objectType, stringArg } from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('name');
    t.nonNull.string('email');
  },
});

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('user', {
      type: User,
      args: {
        id: stringArg(),
      },
      resolve: async (_, { id }, ctx) => {
        return ctx.prisma.user.findMany({
          where: {
            id: id ?? undefined,
          },
        });
      },
    });
  },
});
