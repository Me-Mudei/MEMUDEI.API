import { CalendarRepository, RepositoryFactory } from '../../../domain';
import { Broker } from '../../../../shared/infra/';
import { CalendarOutput, CalendarOutputMapper } from '../../dto';
import { UseCase } from '../../../../shared/app';
import { LoggerInterface } from '../../../../shared/infra/logger/logger.interface';

export class GetCalendarUseCase
  implements UseCase<{ id: string }, CalendarOutput>
{
  calendarRepository: CalendarRepository;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
    readonly logger: LoggerInterface,
  ) {
    this.calendarRepository = repositoryFactory.createCalendarRepository();
  }

  async execute(input: { id: string }): Promise<CalendarOutput> {
    this.logger.info({ message: 'Start GetCalendar Use Case' });
    const calendar = await this.calendarRepository.findById(input.id);
    return CalendarOutputMapper.toOutput(calendar);
  }
}
