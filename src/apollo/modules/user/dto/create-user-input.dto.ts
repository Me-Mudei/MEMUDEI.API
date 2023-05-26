import { inputObjectType } from 'nexus';

export const CreateUserInput = inputObjectType({
  name: 'create_user_input',
  definition(t) {
    t.nonNull.string('email');
    t.nonNull.string('name');
  },
});
