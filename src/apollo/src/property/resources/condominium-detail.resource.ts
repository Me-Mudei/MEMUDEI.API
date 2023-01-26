import { mutationField, queryField, nullable, nonNull, list } from 'nexus';
import { isAdmin } from '../../shared/rules';

export const GetCondominiumDetail = queryField('get_condominium_detail', {
  type: 'condominium_detail_output',
  args: { input: nonNull('get_condominium_detail_input') },
  resolve: async (_, { input }, ctx) => {
    return ctx.propertyService.getCondominiumDetail(input as any);
  },
});

export const SearchCondominiumDetail = queryField('search_condominium_detail', {
  type: 'pagination_output',
  shield: isAdmin(),
  args: { input: nullable('search_input') },
  resolve: async (_, { input }, ctx) => {
    return ctx.propertyService.searchCondominiumDetail(input as any);
  },
});

export const CreateCondominiumDetail = mutationField(
  'create_condominium_detail',
  {
    type: 'condominium_detail_output',
    shield: isAdmin(),
    args: { input: list(nonNull('create_condominium_detail_input')) },
    resolve: async (_, { input }, ctx) => {
      return ctx.propertyService.createCondominiumDetail(input as any);
    },
  },
);

export const UpdateCondominiumDetail = mutationField(
  'update_condominium_detail',
  {
    type: 'condominium_detail_output',
    shield: isAdmin(),
    args: { input: nonNull('update_condominium_detail_input') },
    resolve: async (_, { input }, ctx) => {
      return ctx.propertyService.updateCondominiumDetail(input as any);
    },
  },
);

export const DeleteCondominiumDetail = mutationField(
  'delete_condominium_details',
  {
    type: 'condominium_detail_output',
    shield: isAdmin(),
    args: { input: list(nonNull('delete_condominium_detail_input')) },
    resolve: async (_, { input }, ctx) => {
      await ctx.propertyService.deleteCondominiumDetail(input as any);
      return { id: input[0].id };
    },
  },
);
