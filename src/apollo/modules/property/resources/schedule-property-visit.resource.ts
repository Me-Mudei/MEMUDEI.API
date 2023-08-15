import { mutationField, nonNull } from "nexus";

import {
  SchedulePropertyVisitInputMapper,
  SchedulePropertyVisitOutputMapper
} from "../dto";
import { canSchedulePropertyVisit } from "../rules";

export const SchedulePropertyVisit = mutationField("schedule_property_visit", {
  type: "schedule_property_visit_output",
  shield: canSchedulePropertyVisit(),
  args: { input: nonNull("schedule_property_visit_input") },
  resolve: async (_, args, ctx) => {
    const input = await SchedulePropertyVisitInputMapper.toInput(args.input);
    const output = await ctx.propertyService.schedulePropertyVisit(input);
    return SchedulePropertyVisitOutputMapper.toOutput(output);
  }
});
