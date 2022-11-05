import { RepositoryFactory } from '../../../domain/factory';
import {
  ScheduleInMemoryRepository,
  CalendarInMemoryRepository,
} from '../../repository';

export class InMemoryRepositoryFactory implements RepositoryFactory {
  createScheduleRepository() {
    return new ScheduleInMemoryRepository();
  }

  createCalendarRepository() {
    return new CalendarInMemoryRepository();
  }
}
