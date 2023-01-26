import { Calendar, CalendarRepository } from '../../../domain';
import { RepositoryFactory } from '../../../domain/factory';
import { Broker, LoggerInterface, WinstonLogger } from '#shared/infra';
import {
  CreateCalendarInput,
  CalendarOutput,
  CalendarOutputMapper,
} from '../../dto';
import { UseCase } from '#shared/app';

export class CreateCalendarUseCase
  implements UseCase<CreateCalendarInput, CalendarOutput>
{
  calendarRepository: CalendarRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
  ) {
    this.logger = WinstonLogger.getInstance();
    this.calendarRepository = repositoryFactory.createCalendarRepository();
  }

  async execute(_input: CreateCalendarInput): Promise<CalendarOutput> {
    this.logger.info({ message: 'Start CreateCalendar Use Case' });
    const calendar = new Calendar({});
    await this.calendarRepository.insert(calendar);
    return CalendarOutputMapper.toOutput(calendar);
  }
}
