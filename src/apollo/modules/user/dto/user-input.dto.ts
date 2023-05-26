import { inputObjectType } from 'nexus';

export const CreateUserInput = inputObjectType({
  name: 'create_user_input',
  definition(t) {
    t.nonNull.string('email');
    t.nonNull.string('name');
    t.nullable.string('external_id');
  },
});

export const ValidateUserInput = inputObjectType({
  name: 'validate_user_input',
  definition(t) {
    t.nonNull.string('email');
    //t.nullable.string('external_id');
  },
});
