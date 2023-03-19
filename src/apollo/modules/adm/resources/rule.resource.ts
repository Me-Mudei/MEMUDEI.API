import { mutationField, queryField, nullable, nonNull, list } from 'nexus';
import { isAdmin } from '../../shared/rules';

export const GetRule = queryField('get_rule', {
  type: 'rule_output',
  args: { input: nonNull('get_rule_input') },
  resolve: async (_, { input }, ctx) => {
    return ctx.admService.getRule(input as any);
  },
});

export const SearchRules = queryField('search_rules', {
  type: 'pagination_output',
  shield: isAdmin(),
  args: { input: nullable('search_input') },
  resolve: async (_, { input }, ctx) => {
    return ctx.admService.searchRule(input as any) as any;
  },
});

export const CreateRule = mutationField('create_rule', {
  type: 'rule_output',
  shield: isAdmin(),
  args: { input: list(nonNull('create_rule_input')) },
  resolve: async (_, { input }, ctx) => {
    return ctx.admService.createRule(input as any);
  },
});

export const UpdateRule = mutationField('update_rule', {
  type: 'rule_output',
  shield: isAdmin(),
  args: { input: nonNull('update_rule_input') },
  resolve: async (_, { input }, ctx) => {
    return ctx.admService.updateRule(input as any);
  },
});

export const DeleteRule = mutationField('delete_rules', {
  type: 'rule_output',
  shield: isAdmin(),
  args: { input: list(nonNull('delete_rule_input')) },
  resolve: async (_, { input }, ctx) => {
    await ctx.admService.deleteRule(input as any);
    return { id: input[0].id };
  },
});
