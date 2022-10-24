import { mutationField, queryField, nullable, nonNull, list } from 'nexus';
import { isAdmin } from '../../shared/rules';

export const GetPropertyType = queryField('get_property_type', {
  type: 'property_type_output',
  args: { input: nonNull('get_property_type_input') },
  resolve: async (_, { input }, ctx) => {
    return ctx.propertyService.getPropertyType(input as any);
  },
});

export const SearchPropertyType = queryField('search_property_type', {
  type: 'pagination_output',
  shield: isAdmin(),
  args: { input: nullable('search_input') },
  resolve: async (_, { input }, ctx) => {
    return ctx.propertyService.searchPropertyType(input as any);
  },
});

export const CreatePropertyType = mutationField('create_property_type', {
  type: 'property_type_output',
  shield: isAdmin(),
  args: { input: list(nonNull('create_property_type_input')) },
  resolve: async (_, { input }, ctx) => {
    return ctx.propertyService.createPropertyType(input as any);
  },
});

export const UpdatePropertyType = mutationField('update_property_type', {
  type: 'property_type_output',
  shield: isAdmin(),
  args: { input: nonNull('update_property_type_input') },
  resolve: async (_, { input }, ctx) => {
    return ctx.propertyService.updatePropertyType(input as any);
  },
});

export const DeletePropertyType = mutationField('delete_property_types', {
  type: 'property_type_output',
  shield: isAdmin(),
  args: { input: list(nonNull('delete_property_type_input')) },
  resolve: async (_, { input }, ctx) => {
    return ctx.propertyService.deletePropertyType(input as any);
  },
});
