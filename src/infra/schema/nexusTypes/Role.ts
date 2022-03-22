import { objectType } from 'nexus';

export const Role = objectType({
  name: 'Role',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('name');
    t.string('description');
  },
});
