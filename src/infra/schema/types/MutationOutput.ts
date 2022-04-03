import { objectType } from 'nexus';

export default objectType({
  name: 'MutationOutput',
  definition(t) {
    t.string('status');
    t.string('message');
  },
});
