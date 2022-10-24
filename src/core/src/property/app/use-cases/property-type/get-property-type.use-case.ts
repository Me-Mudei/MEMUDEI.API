import { PropertyTypeRepository, RepositoryFactory } from '../../../domain';
import { Broker } from '../../../../shared/infra/';
import { PropertyTypeOutput, PropertyTypeOutputMapper } from '../../dto';
import { UseCase } from '../../../../shared/app';
import { LoggerInterface } from '../../../../shared/infra/logger/logger.interface';

export class GetPropertyTypeUseCase
  implements UseCase<{ id: string }, PropertyTypeOutput>
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

  async execute(input: { id: string }): Promise<PropertyTypeOutput> {
    this.logger.info({ message: 'Start GetPropertyType Use Case' });
    const propertyType = await this.propertyTypeRepository.findById(input.id);
    return PropertyTypeOutputMapper.toOutput(propertyType);
  }
}
