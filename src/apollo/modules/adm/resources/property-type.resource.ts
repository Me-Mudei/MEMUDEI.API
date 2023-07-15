import { mutationField, queryField, nullable, nonNull, list } from "nexus";

export const GetPropertyType = queryField("get_property_type", {
  type: "property_type_output",
  args: { input: nonNull("get_property_type_input") },
  resolve: async (_, { input }, ctx) => {
    return ctx.admService.getPropertyType(input as any);
  }
});

export const SearchPropertyTypes = queryField("search_property_types", {
  type: "pagination_output",
  args: { input: nullable("search_input") },
  resolve: async (_, { input }, ctx) => {
    return ctx.admService.searchPropertyType(input as any) as any;
  }
});

export const CreatePropertyType = mutationField("create_property_type", {
  type: "property_type_output",
  args: { input: list(nonNull("create_property_type_input")) },
  resolve: async (_, { input }, ctx) => {
    return ctx.admService.createPropertyType(input as any);
  }
});

export const UpdatePropertyType = mutationField("update_property_type", {
  type: "property_type_output",
  args: { input: nonNull("update_property_type_input") },
  resolve: async (_, { input }, ctx) => {
    return ctx.admService.updatePropertyType(input as any);
  }
});

export const DeletePropertyType = mutationField("delete_property_types", {
  type: "property_type_output",
  args: { input: list(nonNull("delete_property_type_input")) },
  resolve: async (_, { input }, ctx) => {
    await ctx.admService.deletePropertyType(input as any);
    return { id: input[0].id };
  }
});
