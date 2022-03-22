import { objectType } from 'nexus';

export const Address = objectType({
  name: 'Address',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('street');
    t.nonNull.string('number');
    t.string('complement');
    t.string('neighborhood');
    t.nonNull.string('city');
    t.nonNull.string('state');
    t.nonNull.string('zip_code');
    t.nonNull.field('location', { type: 'Location' });
  },
});
