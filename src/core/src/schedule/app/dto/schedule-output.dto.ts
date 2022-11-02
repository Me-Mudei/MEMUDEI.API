import { Schedule } from '../../domain/entities';

export type ScheduleOutput = {
  id: string;
  created_at: Date;
  updated_at: Date;
};

export class ScheduleOutputMapper {
  static toOutput(schedule: Schedule): ScheduleOutput {
    return {
      id: schedule.id,
      created_at: schedule.created_at,
      updated_at: schedule.updated_at,
    };
  }
}
