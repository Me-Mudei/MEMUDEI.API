import {
  CalendarRepository,
  RepositoryFactory,
  CalendarSearchParams,
} from '../../../domain';
import { Broker, LoggerInterface, SingletonLogger } from '#shared/infra';
import { CalendarOutput, CalendarOutputMapper } from '../../dto';
import {
  UseCase,
  SearchInputDto,
  PaginationOutputDto,
  PaginationOutputMapper,
} from '#shared/app';

export class SearchCalendarUseCase
  implements UseCase<SearchInputDto, PaginationOutputDto<CalendarOutput>>
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

  async execute(
    input: SearchInputDto,
  ): Promise<PaginationOutputDto<CalendarOutput>> {
    this.logger.info({ message: 'Start SearchCalendar Use Case' });
    const params = new CalendarSearchParams(input);
    const calendar = await this.calendarRepository.search(params);
    const items = calendar.items.map((calendar) =>
      CalendarOutputMapper.toOutput(calendar),
    );

    return PaginationOutputMapper.toOutput(items, calendar);
  }
}
