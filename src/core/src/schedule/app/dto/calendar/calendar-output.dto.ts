import { Calendar } from '../../../domain/entities';

export type CalendarOutput = {
  id: string;
  created_at: Date;
  updated_at: Date;
};

export class CalendarOutputMapper {
  static toOutput(schedule: Calendar): CalendarOutput {
    return {
      id: schedule.id,
      created_at: schedule.created_at,
      updated_at: schedule.updated_at,
    };
  }
}
