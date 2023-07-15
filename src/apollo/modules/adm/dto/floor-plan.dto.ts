import { objectType, inputObjectType } from "nexus";

export const FloorPlanOutput = objectType({
  name: "floor_plan_output",
  definition(t) {
    t.nonNull.string("id");
  }
});

export const GetFloorPlanInput = inputObjectType({
  name: "get_floor_plan_input",
  definition(t) {
    t.nonNull.string("id");
  }
});

export const CreateFloorPlanInput = inputObjectType({
  name: "create_floor_plan_input",
  definition(t) {
    t.nonNull.string("name");
    t.nullable.string("unit");
  }
});

export const UpdateFloorPlanInput = inputObjectType({
  name: "update_floor_plan_input",
  definition(t) {
    t.nonNull.string("id");
    t.nullable.string("name");
    t.nullable.string("unit");
  }
});

export const DeleteFloorPlanInput = inputObjectType({
  name: "delete_floor_plan_input",
  definition(t) {
    t.nonNull.string("id");
  }
});
