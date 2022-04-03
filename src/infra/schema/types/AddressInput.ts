import { inputObjectType } from 'nexus';

export default inputObjectType({
  name: 'AddressInput',
  definition(t) {
    t.nonNull.string('street');
    t.nonNull.string('number');
    t.nonNull.string('country');
    t.nonNull.string('zipCode');
    t.nullable.string('neighborhood');
    t.nullable.string('complement');
  },
});
