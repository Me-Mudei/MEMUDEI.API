import { objectType } from 'nexus';

export const UserOutput = objectType({
  name: 'user_output',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('name');
    t.nonNull.string('email');
    t.nonNull.string('role_name');
    t.nonNull.date('created_at');
    t.nonNull.date('updated_at');
  },
});
