import { UseCase } from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { RepositoryFactory } from "../../../domain/factory";
import { FloorPlanRepository } from "../../../domain/repository";
import { FloorPlanOutput, FloorPlanOutputMapper } from "../../dto";

export class GetFloorPlanUseCase
  implements UseCase<{ id: string }, FloorPlanOutput>
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

  async execute(input: { id: string }): Promise<FloorPlanOutput> {
    this.logger.info({ message: "Start GetFloorPlan Use Case" });
    const floorPlan = await this.floorPlanRepository.findById(input.id);
    return FloorPlanOutputMapper.toOutput(floorPlan);
  }
}
