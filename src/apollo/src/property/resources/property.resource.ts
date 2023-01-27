import { mutationField, queryField, nullable, nonNull } from 'nexus';
import { isAdmin } from '../../shared/rules';

export const CreateProperty = mutationField('create_property', {
  type: 'property_output',
  shield: isAdmin(),
  args: { input: nonNull('create_property_input') },
  resolve: async (_, { input }, ctx) => {
    const photos = await Promise.all(input.photos.map((photo) => photo));
    const res = ctx.propertyService.createProperty({ ...input, photos } as any);
    return res as any;
  },
});

export const GetProperty = queryField('get_property', {
  type: 'property_output',
  args: { input: nonNull('get_property_input') },
  resolve: async (_, { input }, ctx) => {
    const res = ctx.propertyService.getProperty(input);
    return res as any;
  },
});

export const SearchProperties = queryField('search_properties', {
  type: 'pagination_output',
  shield: isAdmin(),
  args: { input: nullable('property_search_input') },
  resolve: async (_, { input }, ctx) => {
    const res = await ctx.propertyService.searchProperty(input as any);
    return res as any;
  },
});
