import { UseCase } from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { FloorPlan } from "../../../domain/entities";
import { RepositoryFactory } from "../../../domain/factory";
import { FloorPlanRepository } from "../../../domain/repository";
import {
  CreateFloorPlanInput,
  FloorPlanOutput,
  FloorPlanOutputMapper,
} from "../../dto";

export class CreateFloorPlanUseCase
  implements UseCase<CreateFloorPlanInput, FloorPlanOutput>
{
  floorPlanRepository: FloorPlanRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
  ) {
    this.logger = WinstonLogger.getInstance();
    this.floorPlanRepository = repositoryFactory.createFloorPlanRepository();
  }

  async execute(input: CreateFloorPlanInput): Promise<FloorPlanOutput> {
    this.logger.info({ message: "Start CreateFloorPlan Use Case" });
    const floorPlan = new FloorPlan({
      key: input.key,
      name: input.name,
      unit: input.unit,
    });
    await this.floorPlanRepository.insert(floorPlan);
    return FloorPlanOutputMapper.toOutput(floorPlan);
  }
}
