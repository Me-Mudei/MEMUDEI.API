import {
  CalendarRepository,
  RepositoryFactory,
  CalendarSearchParams,
} from '../../../domain';
import { Broker } from '../../../../shared/infra/';
import { CalendarOutput, CalendarOutputMapper } from '../../dto';
import { UseCase } from '../../../../shared/app';
import { LoggerInterface } from '../../../../shared/infra/logger/logger.interface';
import { SearchInputDto } from '../../../../shared/app/dto/search-input.dto';
import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from '../../../../shared/app/dto/pagination-output.dto';

export class SearchCalendarUseCase
  implements UseCase<SearchInputDto, PaginationOutputDto<CalendarOutput>>
{
  calendarRepository: CalendarRepository;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
    readonly logger: LoggerInterface,
  ) {
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
