import { PropertyTypeRepository } from '../../../domain/repository';
import { RepositoryFactory } from '../../../domain/factory';
import { PropertyType } from '../../../domain/entities';
import { Broker, LoggerInterface, WinstonLogger } from '#shared/infra';
import {
  CreatePropertyTypeInput,
  PropertyTypeOutput,
  PropertyTypeOutputMapper,
} from '../../dto';
import { UseCase } from '#shared/app';

export class CreatePropertyTypeUseCase
  implements UseCase<CreatePropertyTypeInput, PropertyTypeOutput>
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

  async execute(input: CreatePropertyTypeInput): Promise<PropertyTypeOutput> {
    this.logger.info({ message: 'Start CreatePropertyType Use Case' });
    const propertyType = new PropertyType({
      name: input.name,
    });
    await this.propertyTypeRepository.insert(propertyType);
    return PropertyTypeOutputMapper.toOutput(propertyType);
  }
}
