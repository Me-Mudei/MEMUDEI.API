import { inputObjectType } from 'nexus';

export default inputObjectType({
  name: 'CreateUserInput',
  definition(t) {
    t.nonNull.string('email');
    t.nonNull.string('name');
    t.nonNull.string('roleName');
  },
});
