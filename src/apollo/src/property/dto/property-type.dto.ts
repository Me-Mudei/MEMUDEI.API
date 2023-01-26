import { objectType, inputObjectType } from 'nexus';

export const PropertyTypeOutput = objectType({
  name: 'property_type_output',
  definition(t) {
    t.nonNull.string('id');
  },
});

export const GetPropertyTypeInput = inputObjectType({
  name: 'get_property_type_input',
  definition(t) {
    t.nonNull.string('id');
  },
});

export const CreatePropertyTypeInput = inputObjectType({
  name: 'create_property_type_input',
  definition(t) {
    t.nonNull.string('name');
    t.nullable.string('description');
  },
});

export const UpdatePropertyTypeInput = inputObjectType({
  name: 'update_property_type_input',
  definition(t) {
    t.nonNull.string('id');
    t.nullable.string('name');
    t.nullable.string('description');
  },
});

export const DeletePropertyTypeInput = inputObjectType({
  name: 'delete_property_type_input',
  definition(t) {
    t.nonNull.string('id');
  },
});
