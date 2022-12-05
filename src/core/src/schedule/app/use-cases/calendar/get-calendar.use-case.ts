import { CalendarRepository } from '../../../domain/repository';
import { RepositoryFactory } from '../../../domain/factory';
import { Broker, LoggerInterface, SingletonLogger } from '#shared/infra';
import { CalendarOutput, CalendarOutputMapper } from '../../dto';
import { UseCase } from '#shared/app';

export class GetCalendarUseCase
  implements UseCase<{ id: string }, CalendarOutput>
{
  calendarRepository: CalendarRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
  ) {
    this.logger = SingletonLogger.getInstance();
    this.calendarRepository = repositoryFactory.createCalendarRepository();
  }

  async execute(input: { id: string }): Promise<CalendarOutput> {
    this.logger.info({ message: 'Start GetCalendar Use Case' });
    const calendar = await this.calendarRepository.findById(input.id);
    return CalendarOutputMapper.toOutput(calendar);
  }
}
