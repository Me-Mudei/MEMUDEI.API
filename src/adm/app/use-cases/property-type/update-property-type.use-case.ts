import { PropertyTypeRepository } from '../../../domain/repository';
import { RepositoryFactory } from '../../../domain/factory';
import { PropertyType } from '../../../domain/entities';
import { Broker, LoggerInterface, WinstonLogger } from '#shared/infra';
import {
  UpdatePropertyTypeInput,
  PropertyTypeOutput,
  PropertyTypeOutputMapper,
} from '../../dto';
import { UseCase } from '#shared/app';

export class UpdatePropertyTypeUseCase
  implements UseCase<UpdatePropertyTypeInput, PropertyTypeOutput>
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

  async execute(input: UpdatePropertyTypeInput): Promise<PropertyTypeOutput> {
    this.logger.info({ message: 'Start UpdatePropertyType Use Case' });
    const propertyType = new PropertyType({
      key: input.key,
      name: input.name,
      description: input.description,
    });
    await this.propertyTypeRepository.update(propertyType);
    return PropertyTypeOutputMapper.toOutput(propertyType);
  }
}
