import { objectType } from 'nexus';

export const Location = objectType({
  name: 'Location',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('latitude');
    t.nonNull.string('longitude');
  },
});
