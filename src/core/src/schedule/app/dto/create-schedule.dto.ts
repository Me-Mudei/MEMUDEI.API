export type CreateScheduleInput = {
  start: Date;
  obs?: string;
  property_id: string;
  scheduler_id: string;
};

export type UpdateScheduleInput = {
  id: string;
};
