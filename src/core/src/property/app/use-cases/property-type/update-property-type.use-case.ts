import {
  PropertyType,
  PropertyTypeRepository,
  RepositoryFactory,
} from '../../../domain';
import { Broker } from '../../../../shared/infra/';
import {
  CreatePropertyTypeInput,
  PropertyTypeOutput,
  PropertyTypeOutputMapper,
} from '../../dto';
import { UseCase } from '../../../../shared/app';
import { LoggerInterface } from '../../../../shared/infra/logger/logger.interface';

export class UpdatePropertyTypeUseCase
  implements UseCase<UpdatePropertyTypeInput, PropertyTypeOutput>
{
  propertyTypeRepository: PropertyTypeRepository;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
    readonly logger: LoggerInterface,
  ) {
    this.propertyTypeRepository =
      repositoryFactory.createPropertyTypeRepository();
  }

  async execute(input: UpdatePropertyTypeInput): Promise<PropertyTypeOutput> {
    this.logger.info({ message: 'Start UpdatePropertyType Use Case' });
    const propertyType = new PropertyType({
      name: input.name,
    });
    await this.propertyTypeRepository.update(propertyType);
    return PropertyTypeOutputMapper.toOutput(propertyType);
  }
}
