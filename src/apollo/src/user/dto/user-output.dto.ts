import { objectType } from 'nexus';

export const UserOutput = objectType({
  name: 'user_output',
  definition(t) {
    t.int('status');
    t.string('message');
  },
});
