import { FloorPlanRepository } from '../../../domain/repository';
import { RepositoryFactory } from '../../../domain/factory';
import { Broker, LoggerInterface, WinstonLogger } from '#shared/infra';
import { FloorPlanOutput, FloorPlanOutputMapper } from '../../dto';
import { UseCase } from '#shared/app';

export class GetFloorPlanUseCase
  implements UseCase<{ id: string }, FloorPlanOutput>
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

  async execute(input: { id: string }): Promise<FloorPlanOutput> {
    this.logger.info({ message: 'Start GetFloorPlan Use Case' });
    const floorPlan = await this.floorPlanRepository.findById(input.id);
    return FloorPlanOutputMapper.toOutput(floorPlan);
  }
}
