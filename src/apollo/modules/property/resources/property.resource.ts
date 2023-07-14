import { mutationField, queryField, nullable, nonNull } from 'nexus';
import {
  canCreateProperty,
  canUpdateProperty,
  canReadProperty,
  canSearchProperty,
} from '../rules';
import {
  CreatePropertyInputMapper,
  CreatePropertyOutputMapper,
  UpdatePropertyInputMapper,
  UpdatePropertyOutputMapper,
} from '../dto';

export const CreateProperty = mutationField('create_property', {
  type: 'create_property_output',
  //shield: canCreateProperty(),
  args: { input: nonNull('create_property_input') },
  resolve: async (_, args, ctx) => {
    const input = await CreatePropertyInputMapper.toInput({
      property: args.input,
      user_id: 'BjOetze4h1PnlgOL6bQJx',
    });
    const output = await ctx.propertyService.createProperty(input);
    return CreatePropertyOutputMapper.toOutput(output);
  },
});

export const UpdateProperty = mutationField('update_property', {
  type: 'update_property_output',
  shield: canUpdateProperty(),
  args: { input: nonNull('update_property_input') },
  resolve: async (_, args, ctx) => {
    const input = await UpdatePropertyInputMapper.toInput({
      property: args.input,
      user_id: ctx.user.id,
    });
    const output = await ctx.propertyService.updateProperty(input);
    return UpdatePropertyOutputMapper.toOutput(output);
  },
});

export const GetProperty = queryField('get_property', {
  type: 'property_output',
  shield: canReadProperty(),
  args: { input: nonNull('get_property_input') },
  resolve: async (_, { input }, ctx) => {
    return ctx.propertyService.getProperty(input) as any;
  },
});

export const SearchProperties = queryField('search_properties', {
  type: 'properties_pagination_output',
  shield: canSearchProperty(),
  args: { input: nullable('search_properties_input') },
  resolve: async (_, { input }, ctx) => {
    const res = await ctx.propertyService.searchProperty(input);
    console.log(res);
    return res as any;
  },
});
