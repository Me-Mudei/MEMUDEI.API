import { objectType, inputObjectType } from 'nexus';

export const PropertyRelationshipOutput = objectType({
  name: 'property_relationship_output',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('name');
    t.nullable.string('description');
    t.nonNull.date('created_at');
    t.nonNull.date('updated_at');
  },
});

export const GetPropertyRelationshipInput = inputObjectType({
  name: 'get_property_relationship_input',
  definition(t) {
    t.nonNull.string('id');
  },
});

export const CreatePropertyRelationshipInput = inputObjectType({
  name: 'create_property_relationship_input',
  definition(t) {
    t.nonNull.string('name');
    t.nullable.string('description');
  },
});

export const UpdatePropertyRelationshipInput = inputObjectType({
  name: 'update_property_relationship_input',
  definition(t) {
    t.nonNull.string('id');
    t.nullable.string('name');
    t.nullable.string('description');
  },
});

export const DeletePropertyRelationshipInput = inputObjectType({
  name: 'delete_property_relationship_input',
  definition(t) {
    t.nonNull.string('id');
  },
});
