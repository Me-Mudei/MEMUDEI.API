import { mutationField, queryField, nullable, nonNull, list } from 'nexus';

export const GetCondominiumDetail = queryField('get_condominium_detail', {
  type: 'condominium_detail_output',
  args: { input: nonNull('get_condominium_detail_input') },
  resolve: async (_, { input }, ctx) => {
    return ctx.admService.getCondominiumDetail(input as any);
  },
});

export const SearchCondominiumDetails = queryField(
  'search_condominium_details',
  {
    type: 'pagination_output',
    args: { input: nullable('search_input') },
    resolve: async (_, { input }, ctx) => {
      return ctx.admService.searchCondominiumDetail(input as any) as any;
    },
  },
);

export const CreateCondominiumDetail = mutationField(
  'create_condominium_detail',
  {
    type: 'condominium_detail_output',
    args: { input: list(nonNull('create_condominium_detail_input')) },
    resolve: async (_, { input }, ctx) => {
      return ctx.admService.createCondominiumDetail(input as any);
    },
  },
);

export const UpdateCondominiumDetail = mutationField(
  'update_condominium_detail',
  {
    type: 'condominium_detail_output',
    args: { input: nonNull('update_condominium_detail_input') },
    resolve: async (_, { input }, ctx) => {
      return ctx.admService.updateCondominiumDetail(input as any);
    },
  },
);

export const DeleteCondominiumDetail = mutationField(
  'delete_condominium_details',
  {
    type: 'condominium_detail_output',
    args: { input: list(nonNull('delete_condominium_detail_input')) },
    resolve: async (_, { input }, ctx) => {
      await ctx.admService.deleteCondominiumDetail(input as any);
      return { id: input[0].id };
    },
  },
);
