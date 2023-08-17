import { queryField, nullable } from "nexus";

import { canSearchProperty } from "../rules";

export const SearchProperties = queryField("search_properties", {
  type: "properties_pagination_output",
  shield: canSearchProperty(),
  args: { input: nullable("search_properties_input") },
  resolve: async (_, { input }, ctx) => {
    return ctx.propertyService.searchProperty(input) as any;
  }
});
