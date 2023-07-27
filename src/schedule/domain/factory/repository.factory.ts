import { ScheduleRepository, CalendarRepository } from "../repository";

export interface RepositoryFactory {
  createScheduleRepository(): ScheduleRepository;
  createCalendarRepository(): CalendarRepository;
}
