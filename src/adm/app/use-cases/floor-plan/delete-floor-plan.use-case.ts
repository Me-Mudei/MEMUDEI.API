import { FloorPlanRepository } from '../../../domain/repository';
import { RepositoryFactory } from '../../../domain/factory';
import { Broker, LoggerInterface, WinstonLogger } from '#shared/infra';
import { UseCase } from '#shared/app';

export class DeleteFloorPlanUseCase implements UseCase<{ id: string }, void> {
  floorPlanRepository: FloorPlanRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
  ) {
    this.logger = WinstonLogger.getInstance();
    this.floorPlanRepository = repositoryFactory.createFloorPlanRepository();
  }

  async execute(input: { id: string }): Promise<void> {
    this.logger.info({ message: 'Start DeleteFloorPlan Use Case' });
    await this.floorPlanRepository.delete(input.id);
  }
}
