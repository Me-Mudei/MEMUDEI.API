import { mutationField, nonNull } from "nexus";

import { ScheduleVisitInputMapper, ScheduleVisitOutputMapper } from "../dto";
import { canSchedulePropertyVisit } from "../rules";

export const SchedulePropertyVisit = mutationField("schedule_property_visit", {
  type: "schedule_visit_output",
  shield: canSchedulePropertyVisit(),
  args: { input: nonNull("schedule_property_visit_input") },
  resolve: async (_, args, ctx) => {
    const input = await ScheduleVisitInputMapper.toInput(args.input);
    const output = await ctx.scheduleService.scheduleVisit(input);
    return ScheduleVisitOutputMapper.toOutput(output);
  }
});
