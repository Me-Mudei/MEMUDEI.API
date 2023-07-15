import { UseCase } from "#shared/app";
import {
  PaginationOutputDto,
  PaginationOutputMapper
} from "#shared/app/dto/pagination-output.dto";
import { SearchInputDto } from "#shared/app/dto/search-input.dto";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import {
  ScheduleRepository,
  RepositoryFactory,
  ScheduleSearchParams
} from "../../domain";
import { ScheduleOutput, ScheduleOutputMapper } from "../dto";

export class SearchScheduleUseCase
  implements UseCase<SearchInputDto, PaginationOutputDto<ScheduleOutput>>
{
  scheduleRepository: ScheduleRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker
  ) {
    this.logger = WinstonLogger.getInstance();
    this.scheduleRepository = repositoryFactory.createScheduleRepository();
  }

  async execute(
    input: SearchInputDto
  ): Promise<PaginationOutputDto<ScheduleOutput>> {
    this.logger.info({ message: "Start SearchSchedule Use Case" });
    const params = new ScheduleSearchParams(input);
    const schedule = await this.scheduleRepository.search(params);
    const items = schedule.items.map((schedule) =>
      ScheduleOutputMapper.toOutput(schedule)
    );

    return PaginationOutputMapper.toOutput(items, schedule);
  }
}
