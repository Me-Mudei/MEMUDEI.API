import { mutationField, queryField, nullable, nonNull, list } from 'nexus';
import { isAdmin } from '../../shared/rules';

export const GetCharge = queryField('get_charge', {
  type: 'charge_output',
  args: { input: nonNull('get_charge_input') },
  resolve: async (_, { input }, ctx) => {
    return ctx.admService.getCharge(input as any);
  },
});

export const SearchCharges = queryField('search_charges', {
  type: 'pagination_output',
  shield: isAdmin(),
  args: { input: nullable('search_input') },
  resolve: async (_, { input }, ctx) => {
    return ctx.admService.searchCharge(input as any);
  },
});

export const CreateCharge = mutationField('create_charge', {
  type: 'charge_output',
  shield: isAdmin(),
  args: { input: list(nonNull('create_charge_input')) },
  resolve: async (_, { input }, ctx) => {
    return ctx.admService.createCharge(input as any);
  },
});

export const UpdateCharge = mutationField('update_charge', {
  type: 'charge_output',
  shield: isAdmin(),
  args: { input: nonNull('update_charge_input') },
  resolve: async (_, { input }, ctx) => {
    return ctx.admService.updateCharge(input as any);
  },
});

export const DeleteCharge = mutationField('delete_charges', {
  type: 'charge_output',
  shield: isAdmin(),
  args: { input: list(nonNull('delete_charge_input')) },
  resolve: async (_, { input }, ctx) => {
    await ctx.admService.deleteCharge(input as any);
    return { id: input[0].id };
  },
});
