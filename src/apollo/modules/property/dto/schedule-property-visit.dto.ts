import {
  ScheduleVisitInput as CoreScheduleVisitInput,
  ScheduleVisitOutput as CoreScheduleVisitOutput
} from "#schedule/app";
import { inputObjectType, objectType } from "nexus";

export const ScheduleVisitInput = inputObjectType({
  name: "schedule_property_visit_input",
  definition(t) {
    t.nonNull.string("property_id");
    t.nonNull.string("date");
    t.nonNull.string("time");
    t.nonNull.field("visitor", { type: "visitor_input" });
    t.nullable.string("note");
  }
});

export const VisitorInput = inputObjectType({
  name: "visitor_input",
  definition(t) {
    t.nonNull.string("name");
    t.nonNull.string("phone");
    t.nonNull.string("email");
  }
});

export const ScheduleVisitOutput = objectType({
  name: "schedule_visit_output",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.field("status", { type: "schedule_status" });
    t.nonNull.date("created_at");
    t.nonNull.date("updated_at");
  }
});

export class ScheduleVisitInputMapper {
  static async toInput(input: any): Promise<CoreScheduleVisitInput> {
    return {
      property_id: input.property_id,
      date: input.date,
      time: input.time,
      visitor: {
        name: input.visitor.name,
        phone: input.visitor.phone,
        email: input.visitor.email
      },
      note: input.note
    };
  }
}

export class ScheduleVisitOutputMapper {
  static toOutput(schedule: CoreScheduleVisitOutput): any {
    return {
      id: schedule.id,
      status: schedule.status as any,
      created_at: schedule.created_at,
      updated_at: schedule.updated_at
    };
  }
}
