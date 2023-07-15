import { objectType, inputObjectType } from "nexus";

export const CondominiumDetailOutput = objectType({
  name: "condominium_detail_output",
  definition(t) {
    t.nonNull.string("id");
  }
});

export const GetCondominiumDetailInput = inputObjectType({
  name: "get_condominium_detail_input",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("name");
    t.nullable.string("description");
    t.nonNull.date("created_at");
    t.nonNull.date("updated_at");
  }
});

export const CreateCondominiumDetailInput = inputObjectType({
  name: "create_condominium_detail_input",
  definition(t) {
    t.nonNull.string("name");
    t.nullable.string("description");
  }
});

export const UpdateCondominiumDetailInput = inputObjectType({
  name: "update_condominium_detail_input",
  definition(t) {
    t.nonNull.string("id");
    t.nullable.string("name");
    t.nullable.string("description");
  }
});

export const DeleteCondominiumDetailInput = inputObjectType({
  name: "delete_condominium_detail_input",
  definition(t) {
    t.nonNull.string("id");
  }
});
