import { mutationField, queryField, nullable, nonNull, list } from 'nexus';
import { isAdmin } from '../../shared/rules';

export const GetPropertyDetail = queryField('get_property_detail', {
  type: 'property_detail_output',
  args: { input: nonNull('get_property_detail_input') },
  resolve: async (_, { input }, ctx) => {
    return ctx.propertyService.getPropertyDetail(input as any);
  },
});

export const SearchPropertyDetail = queryField('search_property_detail', {
  type: 'pagination_output',
  shield: isAdmin(),
  args: { input: nullable('search_input') },
  resolve: async (_, { input }, ctx) => {
    return ctx.propertyService.searchPropertyDetail(input as any);
  },
});

export const CreatePropertyDetail = mutationField('create_property_detail', {
  type: 'property_detail_output',
  shield: isAdmin(),
  args: { input: list(nonNull('create_property_detail_input')) },
  resolve: async (_, { input }, ctx) => {
    return ctx.propertyService.createPropertyDetail(input as any);
  },
});

export const UpdatePropertyDetail = mutationField('update_property_detail', {
  type: 'property_detail_output',
  shield: isAdmin(),
  args: { input: nonNull('update_property_detail_input') },
  resolve: async (_, { input }, ctx) => {
    return ctx.propertyService.updatePropertyDetail(input as any);
  },
});

export const DeletePropertyDetail = mutationField('delete_property_details', {
  type: 'property_detail_output',
  shield: isAdmin(),
  args: { input: list(nonNull('delete_property_detail_input')) },
  resolve: async (_, { input }, ctx) => {
    return ctx.propertyService.deletePropertyDetail(input as any);
  },
});
