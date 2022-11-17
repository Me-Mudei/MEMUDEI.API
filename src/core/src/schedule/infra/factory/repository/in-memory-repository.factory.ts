import { RepositoryFactory } from '../../../domain/factory';
import {
  ScheduleInMemoryRepository,
  CalendarInMemoryRepository,
  PropertyInMemoryRepository,
  UserInMemoryRepository,
} from '../../repository';

export class InMemoryRepositoryFactory implements RepositoryFactory {
  createScheduleRepository() {
    return new ScheduleInMemoryRepository();
  }

  createCalendarRepository() {
    return new CalendarInMemoryRepository();
  }

  createPropertyRepository() {
    return new PropertyInMemoryRepository();
  }

  createUserRepository() {
    return new UserInMemoryRepository();
  }
}
