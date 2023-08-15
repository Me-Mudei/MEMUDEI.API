import { queryField, nonNull } from "nexus";

import { canReadProperty } from "../rules";

export const GetProperty = queryField("get_property", {
  type: "property_output",
  shield: canReadProperty(),
  args: { input: nonNull("get_property_input") },
  resolve: async (_, { input }, ctx) => {
    return ctx.propertyService.getProperty(input) as any;
  }
});
