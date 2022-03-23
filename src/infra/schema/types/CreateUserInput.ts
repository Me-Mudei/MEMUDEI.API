import { enumType, inputObjectType } from 'nexus';

export const GenderType = enumType({
  name: 'GenderType',
  members: ['M', 'F'],
});

export default inputObjectType({
  name: 'CreateUserInput',
  definition(t) {
    t.nonNull.string('name');
    t.nonNull.string('email');
    t.nonNull.string('phone');
    t.nonNull.string('cpf');
    t.nonNull.string('password');
    t.nonNull.field('gender', { type: 'GenderType' });
    t.nonNull.string('born');
    t.nonNull.string('roleName');
    t.nullable.string('description');
    t.nonNull.field('address', {
      type: 'AddressInput',
    });
  },
});
