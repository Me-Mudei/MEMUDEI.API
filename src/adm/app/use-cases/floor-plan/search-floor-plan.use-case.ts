import {
  UseCase,
  SearchInputDto,
  PaginationOutputDto,
  PaginationOutputMapper
} from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { RepositoryFactory } from "../../../domain/factory";
import {
  FloorPlanRepository,
  FloorPlanSearchParams
} from "../../../domain/repository";
import { FloorPlanOutput, FloorPlanOutputMapper } from "../../dto";

export class SearchFloorPlanUseCase
  implements UseCase<SearchInputDto, PaginationOutputDto<FloorPlanOutput>>
{
  floorPlanRepository: FloorPlanRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker
  ) {
    this.logger = WinstonLogger.getInstance();
    this.floorPlanRepository = repositoryFactory.createFloorPlanRepository();
  }

  async execute(
    input: SearchInputDto
  ): Promise<PaginationOutputDto<FloorPlanOutput>> {
    this.logger.info({ message: "Start SearchFloorPlan Use Case" });
    const params = new FloorPlanSearchParams(input);
    const floorPlan = await this.floorPlanRepository.search(params);
    const items = floorPlan.items.map((floorPlan) =>
      FloorPlanOutputMapper.toOutput(floorPlan)
    );

    return PaginationOutputMapper.toOutput(items, floorPlan);
  }
}
