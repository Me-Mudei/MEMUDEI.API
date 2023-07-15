import { objectType, inputObjectType } from "nexus";

export const PropertyDetailOutput = objectType({
  name: "property_detail_output",
  definition(t) {
    t.nonNull.string("id");
  }
});

export const GetPropertyDetailInput = inputObjectType({
  name: "get_property_detail_input",
  definition(t) {
    t.nonNull.string("id");
  }
});

export const CreatePropertyDetailInput = inputObjectType({
  name: "create_property_detail_input",
  definition(t) {
    t.nonNull.string("name");
    t.nullable.string("description");
  }
});

export const UpdatePropertyDetailInput = inputObjectType({
  name: "update_property_detail_input",
  definition(t) {
    t.nonNull.string("id");
    t.nullable.string("name");
    t.nullable.string("description");
  }
});

export const DeletePropertyDetailInput = inputObjectType({
  name: "delete_property_detail_input",
  definition(t) {
    t.nonNull.string("id");
  }
});
