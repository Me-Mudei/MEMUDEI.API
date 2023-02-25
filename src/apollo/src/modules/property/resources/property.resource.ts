import { mutationField, queryField, nullable, nonNull } from 'nexus';
import { isAdmin } from '../../shared/rules';
import { CreatePropertyInputMapper, CreatePropertyOutputMapper } from '../dto';

export const CreateProperty = mutationField('create_property', {
  type: 'create_property_output',
  shield: isAdmin(),
  args: { input: nonNull('create_property_input') },
  resolve: async (_, args, ctx) => {
    const user = { id: 'l5lgcQKhDqoDIOQYPBMj2' };
    const input = await CreatePropertyInputMapper.toInput({
      property: args.input,
      user,
    });
    const output = await ctx.propertyService.createProperty(input);
    return CreatePropertyOutputMapper.toOutput(output);
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
