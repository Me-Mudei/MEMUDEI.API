import { Schedule, User } from "#schedule/domain";

export interface CRM {
  createVisitor(visitor: User): Promise<{ id: string }>;
  createSchedule(schedule: Schedule): Promise<{ id: string }>;
  deleteVisitor(id: string): Promise<void>;
  deleteSchedule(id: string): Promise<void>;
  //validateSchedule(props: any): Promise<void>;
}
