import {
  ScheduleRepository,
  RepositoryFactory,
  ScheduleSearchParams,
} from '../../domain';
import { Broker } from '../../../shared/infra/';
import { ScheduleOutput, ScheduleOutputMapper } from '../dto';
import { UseCase } from '../../../shared/app';
import { LoggerInterface } from '../../../shared/infra/logger/logger.interface';
import { SearchInputDto } from '../../../shared/app/dto/search-input.dto';
import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from '../../../shared/app/dto/pagination-output.dto';

export class SearchScheduleUseCase
  implements UseCase<SearchInputDto, PaginationOutputDto<ScheduleOutput>>
{
  scheduleRepository: ScheduleRepository;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
    readonly logger: LoggerInterface,
  ) {
    this.scheduleRepository = repositoryFactory.createScheduleRepository();
  }

  async execute(
    input: SearchInputDto,
  ): Promise<PaginationOutputDto<ScheduleOutput>> {
    this.logger.info({ message: 'Start SearchSchedule Use Case' });
    const params = new ScheduleSearchParams(input);
    const schedule = await this.scheduleRepository.search(params);
    const items = schedule.items.map((schedule) =>
      ScheduleOutputMapper.toOutput(schedule),
    );

    return PaginationOutputMapper.toOutput(items, schedule);
  }
}
