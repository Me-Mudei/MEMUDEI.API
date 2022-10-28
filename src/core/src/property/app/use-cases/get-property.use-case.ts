import { PropertyRepository, RepositoryFactory } from '../../domain';
import { Broker } from '../../../shared/infra/';
import { PropertyOutput, PropertyOutputMapper } from '../dto';
import { UseCase } from '../../../shared/app';
import { LoggerInterface } from '../../../shared/infra/logger/logger.interface';

export class GetPropertyUseCase
  implements UseCase<{ id: string }, PropertyOutput>
{
  propertyRepository: PropertyRepository;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
    readonly logger: LoggerInterface,
  ) {
    this.propertyRepository = repositoryFactory.createPropertyRepository();
  }

  async execute(input: { id: string }): Promise<PropertyOutput> {
    this.logger.info({ message: 'Start Property Use Case' });
    const property = await this.propertyRepository.findById(input.id);
    return PropertyOutputMapper.toOutput(property);
  }
}
