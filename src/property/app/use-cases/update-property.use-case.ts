import { UseCase } from '#shared/app';
import { UniqueEntityId } from '#shared/domain';
import { Broker, LoggerInterface, WinstonLogger } from '#shared/infra';
import { PropertyRepository } from '../../domain/repository';
import { RepositoryFactory } from '../../domain/factory';
import { UpdatePropertyInput, UpdatePropertyOutput } from '../dto';
import { PropertyStatus } from '../../domain/entities';

export class UpdatePropertyUseCase
  implements UseCase<UpdatePropertyInput, UpdatePropertyOutput>
{
  propertyRepository: PropertyRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
  ) {
    this.logger = WinstonLogger.getInstance();
    this.propertyRepository = repositoryFactory.createPropertyRepository();
  }

  async execute(_input: UpdatePropertyInput): Promise<UpdatePropertyOutput> {
    this.logger.info({ message: 'Start Property Use Case' });
    return {
      id: new UniqueEntityId().value,
      created_at: new Date(),
      updated_at: new Date(),
      status: PropertyStatus.PENDING,
    };
  }
}
