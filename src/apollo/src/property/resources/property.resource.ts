import { mutationField, queryField, nullable, nonNull } from 'nexus';
import { isAdmin } from '../../shared/rules';

export const CreateProperty = mutationField('create_property', {
  type: 'property_output',
  shield: isAdmin(),
  args: { input: nonNull('create_property_input') },
  resolve: async (_, { input }, ctx) => {
    input.photos = await Promise.all(input.photos.map((photo) => photo));
    return ctx.propertyService.createProperty(input) as any;
  },
});

export const GetProperty = queryField('get_property', {
  type: 'property_output',
  args: { input: nonNull('get_property_input') },
  resolve: async (_, { input }, ctx) => {
    return ctx.propertyService.getProperty(input) as any;
  },
});

export const SearchProperties = queryField('search_properties', {
  type: 'pagination_output',
  shield: isAdmin(),
  args: { input: nullable('search_properties_input') },
  resolve: async (_, { input }, ctx) => {
    return ctx.propertyService.searchProperty(input);
  },
});
