import {
  ScheduleRepository,
  CalendarRepository,
  PropertyRepository,
  UserRepository,
} from '../repository';

export interface RepositoryFactory {
  createScheduleRepository(): ScheduleRepository;
  createCalendarRepository(): CalendarRepository;
  createPropertyRepository(): PropertyRepository;
  createUserRepository(): UserRepository;
}
