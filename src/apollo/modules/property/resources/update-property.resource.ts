import { mutationField, nonNull } from "nexus";

import { UpdatePropertyInputMapper, UpdatePropertyOutputMapper } from "../dto";
import { canUpdateProperty } from "../rules";

export const UpdateProperty = mutationField("update_property", {
  type: "update_property_output",
  shield: canUpdateProperty(),
  args: { input: nonNull("update_property_input") },
  resolve: async (_, args, ctx) => {
    const input = await UpdatePropertyInputMapper.toInput({
      property: args.input
    });
    const output = await ctx.propertyService.updateProperty(input);
    return UpdatePropertyOutputMapper.toOutput(output);
  }
});
