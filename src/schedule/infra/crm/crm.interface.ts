import { Schedule } from "#schedule/domain";

export interface CRM {
  createSchedule(schedule: Schedule): Promise<{ id: string }>;
  //deleteSchedule(id: string): Promise<void>;
  //validateSchedule(props: any): Promise<void>;
}
