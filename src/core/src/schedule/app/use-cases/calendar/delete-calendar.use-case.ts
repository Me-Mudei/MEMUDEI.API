import { CalendarRepository, RepositoryFactory } from '../../../domain';
import { Broker } from '../../../../shared/infra/';
import { UseCase } from '../../../../shared/app';
import { LoggerInterface } from '../../../../shared/infra/logger/logger.interface';

export class DeleteCalendarUseCase implements UseCase<{ id: string }, void> {
  calendarRepository: CalendarRepository;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
    readonly logger: LoggerInterface,
  ) {
    this.calendarRepository = repositoryFactory.createCalendarRepository();
  }

  async execute(input: { id: string }): Promise<void> {
    this.logger.info({ message: 'Start DeleteCalendar Use Case' });
    await this.calendarRepository.delete(input.id);
  }
}
