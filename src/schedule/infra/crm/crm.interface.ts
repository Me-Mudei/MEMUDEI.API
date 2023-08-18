import { Schedule } from "#schedule/domain";

export interface CRM {
  createSchedule(schedule: Schedule): Promise<void>;
  deleteSchedule(id: string): Promise<void>;
}
