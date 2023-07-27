import { objectType, inputObjectType } from "nexus";

export const ChargeOutput = objectType({
  name: "charge_output",
  definition(t) {
    t.nonNull.string("id");
  }
});

export const GetChargeInput = inputObjectType({
  name: "get_charge_input",
  definition(t) {
    t.nonNull.string("id");
  }
});

export const CreateChargeInput = inputObjectType({
  name: "create_charge_input",
  definition(t) {
    t.nonNull.string("name");
  }
});

export const UpdateChargeInput = inputObjectType({
  name: "update_charge_input",
  definition(t) {
    t.nonNull.string("id");
    t.nullable.string("name");
  }
});

export const DeleteChargeInput = inputObjectType({
  name: "delete_charge_input",
  definition(t) {
    t.nonNull.string("id");
  }
});
