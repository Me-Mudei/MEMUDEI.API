import {
  Calendar,
  CalendarRepository,
  RepositoryFactory,
} from '../../../domain';
import { Broker } from '../../../../shared/infra/';
import {
  CalendarOutput,
  CalendarOutputMapper,
  UpdateCalendarInput,
} from '../../dto';
import { UseCase } from '../../../../shared/app';
import { LoggerInterface } from '../../../../shared/infra/logger/logger.interface';

export class UpdateCalendarUseCase
  implements UseCase<UpdateCalendarInput, CalendarOutput>
{
  calendarRepository: CalendarRepository;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
    readonly logger: LoggerInterface,
  ) {
    this.calendarRepository = repositoryFactory.createCalendarRepository();
  }

  async execute(_input: UpdateCalendarInput): Promise<CalendarOutput> {
    this.logger.info({ message: 'Start UpdateCalendar Use Case' });
    const calendar = new Calendar({});
    await this.calendarRepository.update(calendar);
    return CalendarOutputMapper.toOutput(calendar);
  }
}
