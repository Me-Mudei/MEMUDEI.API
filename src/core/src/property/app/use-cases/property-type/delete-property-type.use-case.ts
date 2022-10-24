import { PropertyTypeRepository, RepositoryFactory } from '../../../domain';
import { Broker } from '../../../../shared/infra/';
import { UseCase } from '../../../../shared/app';
import { LoggerInterface } from '../../../../shared/infra/logger/logger.interface';

export class DeletePropertyTypeUseCase implements UseCase<{ id: string }, void> {
  propertyTypeRepository: PropertyTypeRepository;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
    readonly logger: LoggerInterface,
  ) {
    this.propertyTypeRepository = repositoryFactory.createPropertyTypeRepository();
  }

  async execute(input: { id: string }): Promise<void> {
    this.logger.info({ message: 'Start DeletePropertyType Use Case' });
    await this.propertyTypeRepository.delete(input.id);
  }
}
