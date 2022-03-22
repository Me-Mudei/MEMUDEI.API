import { mutationType, nonNull, objectType, queryType, stringArg } from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('name');
    t.nonNull.string('email');
    t.nonNull.string('id');
    t.nonNull.string('email');
    t.nonNull.string('phone');
    t.nonNull.string('cpf');
    t.nonNull.string('name');
    t.nonNull.string('password');
    t.boolean('email_is_confirmed');
    t.nonNull.string('gender');
    t.string('description');
    t.nonNull.date('born');
    t.nonNull.string('role_id');
    t.field('Role', { type: 'Role' });
    t.date('disabled_at');
    t.date('deleted_at');
    t.nonNull.date('created_at');
    t.date('updated_at');
    t.nonNull.string('Address');
  },
});

export const UserMutations = mutationType({
  definition(t) {
    t.field('createUser', {
      type: User,
      args: {
        name: nonNull(stringArg()),
        email: nonNull(stringArg()),
        phone: nonNull(stringArg()),
        cpf: nonNull(stringArg()),
        password: nonNull(stringArg()),
        gender: nonNull(stringArg()),
        born: nonNull(stringArg()),
        description: stringArg(),
      },
      resolve: (_, args, ctx) => {
        /**
         * Criar uma  camada de controller pasando o User
         */
        return ctx.prisma.user.upsert({
          where: {
            email: args.email,
          },
          update: {
            name: args.name,
            password: args.password,
            gender: args.gender,
            description: args.description,
            born: new Date(args.born),
          },
          create: {
            email: args.email,
            phone: args.phone,
            cpf: args.cpf,
            name: args.name,
            password: args.password,
            gender: args.gender,
            description: args.description,
            born: new Date(args.born),
            Role: {
              connectOrCreate: {
                where: {
                  name: 'CUSTOMER',
                },
                create: {
                  name: 'CUSTOMER',
                },
              },
            },
            Permission: {
              connectOrCreate: {
                where: {
                  name: 'read:own_account',
                },
                create: {
                  name: 'read:own_account',
                },
              },
            },
          },
          include: {
            Role: true,
            Address: true,
            _count: true,
          },
        });
      },
    });
  },
});

export const UserQuery = queryType({
  definition(t) {
    t.list.field('findUserById', {
      type: 'User',
      args: {
        id: stringArg(),
      },
      resolve: (_, args, ctx) => {
        return ctx.prisma.user.findMany({
          where: {
            id: args.id ?? undefined,
          },
          include: {
            Role: true,
            Address: true,
            _count: true,
          },
        });
      },
    });
  },
});
