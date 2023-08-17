import { mutationField, nonNull } from "nexus";

import { ScheduleVisitInputMapper, ScheduleVisitOutputMapper } from "../dto";
import { canScheduleVisit } from "../rules";

export const ScheduleVisit = mutationField("schedule_visit", {
  type: "schedule_visit_output",
  shield: canScheduleVisit(),
  args: { input: nonNull("schedule_visit_input") },
  resolve: async (_, args, ctx) => {
    const input = await ScheduleVisitInputMapper.toInput(args.input);
    const output = await ctx.scheduleService.scheduleVisit(input);
    return ScheduleVisitOutputMapper.toOutput(output);
  }
});
