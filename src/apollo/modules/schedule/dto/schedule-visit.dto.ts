import {
  ScheduleVisitInput as CoreScheduleVisitInput,
  ScheduleVisitOutput as CoreScheduleVisitOutput
} from "#schedule/app";
import { inputObjectType, objectType } from "nexus";

export const ScheduleVisitInput = inputObjectType({
  name: "schedule_visit_input",
  definition(t) {
    t.nonNull.string("property_id");
    t.nonNull.string("date_time");
    t.nonNull.field("visitor", { type: "visitor_input" });
    t.nullable.field("status", { type: "schedule_status" });
    t.nullable.string("note");
  }
});

export const VisitorInput = inputObjectType({
  name: "visitor_input",
  definition(t) {
    t.nonNull.string("name");
    t.nonNull.string("email");
    t.nullable.string("phone");
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
      date_time: input.date_time,
      status: input.status as any,
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
