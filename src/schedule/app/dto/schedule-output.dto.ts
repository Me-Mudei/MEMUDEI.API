import { Schedule, ScheduleStatus } from "../../domain/entities";

export type ScheduleOutput = {
  id: string;
  status: ScheduleStatus;
  created_at: Date;
  updated_at: Date;
};

export class ScheduleOutputMapper {
  static toOutput(schedule: Schedule): ScheduleOutput {
    return {
      id: schedule.id,
      status: schedule.status,
      created_at: schedule.created_at,
      updated_at: schedule.updated_at
    };
  }
}
