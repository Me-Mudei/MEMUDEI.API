import { objectType, inputObjectType } from 'nexus';

export const PrivacyTypeOutput = objectType({
  name: 'privacy_type_output',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('name');
    t.nullable.string('description');
    t.nonNull.date('created_at');
    t.nonNull.date('updated_at');
  },
});

export const GetPrivacyTypeInput = inputObjectType({
  name: 'get_privacy_type_input',
  definition(t) {
    t.nonNull.string('id');
  },
});

export const CreatePrivacyTypeInput = inputObjectType({
  name: 'create_privacy_type_input',
  definition(t) {
    t.nonNull.string('name');
    t.nullable.string('description');
  },
});

export const UpdatePrivacyTypeInput = inputObjectType({
  name: 'update_privacy_type_input',
  definition(t) {
    t.nonNull.string('id');
    t.nullable.string('name');
    t.nullable.string('description');
  },
});

export const DeletePrivacyTypeInput = inputObjectType({
  name: 'delete_privacy_type_input',
  definition(t) {
    t.nonNull.string('id');
  },
});
