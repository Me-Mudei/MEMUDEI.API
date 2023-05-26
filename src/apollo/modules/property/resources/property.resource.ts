import { mutationField, queryField, nullable, nonNull } from 'nexus';
import {
  canCreateProperty,
  canWriteProperty,
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
      user_id: ctx.user_id,
    });
    const output = await ctx.propertyService.createProperty(input);
    return CreatePropertyOutputMapper.toOutput(output);
  },
});

export const UploadImage = mutationField('update_property', {
  type: 'update_property_output',
  //shield: canWriteProperty(),
  args: { input: nonNull('update_property_input') },
  resolve: async (_, args, ctx) => {
    const input = await UpdatePropertyInputMapper.toInput({
      property: args.input,
      user_id: ctx.user_id,
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
    return ctx.propertyService.searchProperty(input) as any;
  },
});
