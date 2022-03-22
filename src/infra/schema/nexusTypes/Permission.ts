import { objectType } from 'nexus';

export const Permission = objectType({
  name: 'Permission',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('name');
    t.string('description');
  },
});
