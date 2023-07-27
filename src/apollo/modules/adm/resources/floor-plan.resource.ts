import { mutationField, queryField, nullable, nonNull, list } from "nexus";

export const GetFloorPlan = queryField("get_floor_plan", {
  type: "floor_plan_output",
  args: { input: nonNull("get_floor_plan_input") },
  resolve: async (_, { input }, ctx) => {
    return ctx.admService.getFloorPlan(input as any);
  }
});

export const SearchFloorPlans = queryField("search_floor_plans", {
  type: "pagination_output",
  args: { input: nullable("search_input") },
  resolve: async (_, { input }, ctx) => {
    return ctx.admService.searchFloorPlan(input as any) as any;
  }
});

export const CreateFloorPlan = mutationField("create_floor_plan", {
  type: "floor_plan_output",
  args: { input: list(nonNull("create_floor_plan_input")) },
  resolve: async (_, { input }, ctx) => {
    return ctx.admService.createFloorPlan(input as any);
  }
});

export const UpdateFloorPlan = mutationField("update_floor_plan", {
  type: "floor_plan_output",
  args: { input: nonNull("update_floor_plan_input") },
  resolve: async (_, { input }, ctx) => {
    return ctx.admService.updateFloorPlan(input as any);
  }
});

export const DeleteFloorPlan = mutationField("delete_floor_plans", {
  type: "floor_plan_output",
  args: { input: list(nonNull("delete_floor_plan_input")) },
  resolve: async (_, { input }, ctx) => {
    await ctx.admService.deleteFloorPlan(input as any);
    return { id: input[0].id };
  }
});
