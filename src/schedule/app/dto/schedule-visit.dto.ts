import { ScheduleStatus } from "../../domain/entities";

export type ScheduleVisitInput = {
  property_id: string;
  date_time: string;
  status?: ScheduleStatus;
  visitor: {
    name: string;
    email: string;
    phone?: string;
  };
  note: string;
};

export type ScheduleVisitOutput = {
  id: string;
  status: ScheduleStatus;
  created_at: Date;
  updated_at: Date;
};

export class ScheduleVisitOutputMapper {
  static toOutput(schedule: any): ScheduleVisitOutput {
    return {
      id: schedule.id,
      status: schedule.status,
      created_at: schedule.created_at,
      updated_at: schedule.updated_at,
    };
  }
}
