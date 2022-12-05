import { Broker, LoggerInterface, SingletonLogger } from '#shared/infra';
import { UseCase } from '#shared/app';
import { PropertyOutput, PropertyOutputMapper } from '../../dto';
import { PropertyRepository } from '../../../domain/repository';
import { RepositoryFactory } from '../../../domain/factory';

export class GetPropertyUseCase
  implements UseCase<{ id: string }, PropertyOutput>
{
  private propertyRepository: PropertyRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
  ) {
    this.logger = SingletonLogger.getInstance();
    this.propertyRepository = repositoryFactory.createPropertyRepository();
  }

  async execute(input: { id: string }): Promise<PropertyOutput> {
    this.logger.info({ message: 'Start Property Use Case' });
    const property = await this.propertyRepository.findById(input.id);
    return PropertyOutputMapper.toOutput(property);
  }
}
