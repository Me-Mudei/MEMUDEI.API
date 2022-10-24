import { mutationField, queryField, nullable, nonNull, list } from 'nexus';
import { isAdmin } from '../../shared/rules';

export const GetPropertyRelationship = queryField('get_property_relationship', {
  type: 'property_relationship_output',
  args: { input: nonNull('get_property_relationship_input') },
  resolve: async (_, { input }, ctx) => {
    return ctx.propertyService.getPropertyRelationship(input as any);
  },
});

export const SearchPropertyRelationship = queryField(
  'search_property_relationship',
  {
    type: 'pagination_output',
    shield: isAdmin(),
    args: { input: nullable('search_input') },
    resolve: async (_, { input }, ctx) => {
      return ctx.propertyService.searchPropertyRelationship(input as any);
    },
  },
);

export const CreatePropertyRelationship = mutationField(
  'create_property_relationship',
  {
    type: 'property_relationship_output',
    shield: isAdmin(),
    args: { input: list(nonNull('create_property_relationship_input')) },
    resolve: async (_, { input }, ctx) => {
      return ctx.propertyService.createPropertyRelationship(input as any);
    },
  },
);

export const UpdatePropertyRelationship = mutationField(
  'update_property_relationship',
  {
    type: 'property_relationship_output',
    shield: isAdmin(),
    args: { input: nonNull('update_property_relationship_input') },
    resolve: async (_, { input }, ctx) => {
      return ctx.propertyService.updatePropertyRelationship(input as any);
    },
  },
);

export const DeletePropertyRelationship = mutationField(
  'delete_property_relationships',
  {
    type: 'property_relationship_output',
    shield: isAdmin(),
    args: { input: list(nonNull('delete_property_relationship_input')) },
    resolve: async (_, { input }, ctx) => {
      return ctx.propertyService.deletePropertyRelationship(input as any);
    },
  },
);
