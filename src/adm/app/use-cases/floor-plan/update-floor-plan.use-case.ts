import { UseCase } from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { FloorPlan } from "../../../domain/entities";
import { RepositoryFactory } from "../../../domain/factory";
import { FloorPlanRepository } from "../../../domain/repository";
import {
  UpdateFloorPlanInput,
  FloorPlanOutput,
  FloorPlanOutputMapper,
} from "../../dto";

export class UpdateFloorPlanUseCase
  implements UseCase<UpdateFloorPlanInput, FloorPlanOutput>
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

  async execute(input: UpdateFloorPlanInput): Promise<FloorPlanOutput> {
    this.logger.info({ message: "Start UpdateFloorPlan Use Case" });
    const floorPlan = new FloorPlan({
      key: input.key,
      name: input.name,
      unit: input.unit,
    });
    await this.floorPlanRepository.update(floorPlan);
    return FloorPlanOutputMapper.toOutput(floorPlan);
  }
}
