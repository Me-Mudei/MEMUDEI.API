import { objectType } from 'nexus';

export default objectType({
  name: 'FindUserOutput',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('name');
    t.nonNull.string('email');
    t.nonNull.string('phone');
    t.nonNull.string('cpf');
    t.nonNull.string('password');
    t.nonNull.field('gender', { type: 'GenderType' });
    t.nonNull.string('born');
    t.nonNull.boolean('emailIsConfirmed');
    t.nullable.string('description');
    t.nullable.string('description');
    t.nullable.string('born');
    t.nullable.string('roleId');
    t.nullable.string('disabledAt');
    t.nullable.string('deletedAt');
    t.nullable.string('createdAt');
    t.nullable.string('updatedAt');
    t.nullable.string('permissionId');
  },
});
