import { inputObjectType } from 'nexus';

export default inputObjectType({
  name: 'CompleteUserInput',
  definition(t) {
    t.nonNull.string('name');
    t.nonNull.string('email');
    t.nonNull.string('phone');
    t.nonNull.string('cpf');
    t.nonNull.string('password');
    t.nonNull.string('born');
    t.nonNull.string('roleName');
    t.nullable.string('description');
    t.nonNull.field('address', {
      type: 'AddressInput',
    });
  },
});
