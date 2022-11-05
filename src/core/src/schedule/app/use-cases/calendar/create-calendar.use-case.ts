import {
  Calendar,
  CalendarRepository,
  RepositoryFactory,
} from '../../../domain';
import { Broker } from '../../../../shared/infra/';
import {
  CreateCalendarInput,
  CalendarOutput,
  CalendarOutputMapper,
} from '../../dto';
import { UseCase } from '../../../../shared/app';
import { LoggerInterface } from '../../../../shared/infra/logger/logger.interface';

export class CreateCalendarUseCase
  implements UseCase<CreateCalendarInput, CalendarOutput>
{
  calendarRepository: CalendarRepository;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
    readonly logger: LoggerInterface,
  ) {
    this.calendarRepository = repositoryFactory.createCalendarRepository();
  }

  async execute(_input: CreateCalendarInput): Promise<CalendarOutput> {
    this.logger.info({ message: 'Start CreateCalendar Use Case' });
    const calendar = new Calendar({});
    await this.calendarRepository.insert(calendar);
    return CalendarOutputMapper.toOutput(calendar);
  }
}
