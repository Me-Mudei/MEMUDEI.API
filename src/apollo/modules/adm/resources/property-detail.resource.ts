import { mutationField, queryField, nullable, nonNull, list } from 'nexus';

export const GetPropertyDetail = queryField('get_property_detail', {
  type: 'property_detail_output',
  args: { input: nonNull('get_property_detail_input') },
  resolve: async (_, { input }, ctx) => {
    return ctx.admService.getPropertyDetail(input as any);
  },
});

export const SearchPropertyDetails = queryField('search_property_details', {
  type: 'pagination_output',
  args: { input: nullable('search_input') },
  resolve: async (_, { input }, ctx) => {
    return ctx.admService.searchPropertyDetail(input as any) as any;
  },
});

export const CreatePropertyDetail = mutationField('create_property_detail', {
  type: 'property_detail_output',
  args: { input: list(nonNull('create_property_detail_input')) },
  resolve: async (_, { input }, ctx) => {
    return ctx.admService.createPropertyDetail(input as any);
  },
});

export const UpdatePropertyDetail = mutationField('update_property_detail', {
  type: 'property_detail_output',
  args: { input: nonNull('update_property_detail_input') },
  resolve: async (_, { input }, ctx) => {
    return ctx.admService.updatePropertyDetail(input as any);
  },
});

export const DeletePropertyDetail = mutationField('delete_property_details', {
  type: 'property_detail_output',
  args: { input: list(nonNull('delete_property_detail_input')) },
  resolve: async (_, { input }, ctx) => {
    await ctx.admService.deletePropertyDetail(input as any);
    return { id: input[0].id };
  },
});
