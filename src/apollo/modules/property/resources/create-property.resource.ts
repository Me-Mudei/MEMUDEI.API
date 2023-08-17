import { mutationField, nonNull } from "nexus";

import { CreatePropertyInputMapper, CreatePropertyOutputMapper } from "../dto";
import { canCreateProperty } from "../rules";

export const CreateProperty = mutationField("create_property", {
  type: "create_property_output",
  shield: canCreateProperty(),
  args: { input: nonNull("create_property_input") },
  resolve: async (_, args, ctx) => {
    const input = await CreatePropertyInputMapper.toInput({
      property: args.input,
      user_id: ctx.user.id
    });
    const output = await ctx.propertyService.createProperty(input);
    return CreatePropertyOutputMapper.toOutput(output);
  }
});
