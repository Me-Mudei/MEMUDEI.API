import { Calendar, CalendarRepository } from '../../../domain/repository';
import { RepositoryFactory } from '../../../domain/factory';
import { Broker, LoggerInterface, SingletonLogger } from '#shared/infra';
import {
  CalendarOutput,
  CalendarOutputMapper,
  UpdateCalendarInput,
} from '../../dto';
import { UseCase } from '#shared/app';

export class UpdateCalendarUseCase
  implements UseCase<UpdateCalendarInput, CalendarOutput>
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

  async execute(_input: UpdateCalendarInput): Promise<CalendarOutput> {
    this.logger.info({ message: 'Start UpdateCalendar Use Case' });
    const calendar = new Calendar({});
    await this.calendarRepository.update(calendar);
    return CalendarOutputMapper.toOutput(calendar);
  }
}
