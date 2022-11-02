import { ScheduleRepository } from '../repository';

export interface RepositoryFactory {
  createScheduleRepository(): ScheduleRepository;
}
