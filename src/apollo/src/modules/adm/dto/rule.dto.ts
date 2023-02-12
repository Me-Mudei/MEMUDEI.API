import { objectType, inputObjectType } from 'nexus';

export const RuleOutput = objectType({
  name: 'rule_output',
  definition(t) {
    t.nonNull.string('id');
  },
});

export const GetRuleInput = inputObjectType({
  name: 'get_rule_input',
  definition(t) {
    t.nonNull.string('id');
  },
});

export const CreateRuleInput = inputObjectType({
  name: 'create_rule_input',
  definition(t) {
    t.nonNull.string('name');
    t.nullable.string('description');
  },
});

export const UpdateRuleInput = inputObjectType({
  name: 'update_rule_input',
  definition(t) {
    t.nonNull.string('id');
    t.nullable.string('name');
    t.nullable.string('description');
  },
});

export const DeleteRuleInput = inputObjectType({
  name: 'delete_rule_input',
  definition(t) {
    t.nonNull.string('id');
  },
});
