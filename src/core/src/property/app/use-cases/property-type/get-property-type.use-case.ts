import { PropertyTypeRepository } from '../../../domain/repository';
import { RepositoryFactory } from '../../../domain/factory';
import { Broker, LoggerInterface, WinstonLogger } from '#shared/infra';
import { PropertyTypeOutput, PropertyTypeOutputMapper } from '../../dto';
import { UseCase } from '#shared/app';

export class GetPropertyTypeUseCase
  implements UseCase<{ id: string }, PropertyTypeOutput>
{
  propertyTypeRepository: PropertyTypeRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
  ) {
    this.logger = WinstonLogger.getInstance();
    this.propertyTypeRepository =
      repositoryFactory.createPropertyTypeRepository();
  }

  async execute(input: { id: string }): Promise<PropertyTypeOutput> {
    this.logger.info({ message: 'Start GetPropertyType Use Case' });
    const propertyType = await this.propertyTypeRepository.findById(input.id);
    return PropertyTypeOutputMapper.toOutput(propertyType);
  }
}
