import { PropertyDetailRepository, RepositoryFactory } from '../../../domain';
import { Broker } from '../../../../shared/infra/';
import { UseCase } from '../../../../shared/app';
import { LoggerInterface } from '../../../../shared/infra/logger/logger.interface';

export class DeletePropertyDetailUseCase implements UseCase<{ id: string }, void> {
  propertyDetailRepository: PropertyDetailRepository;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
    readonly logger: LoggerInterface,
  ) {
    this.propertyDetailRepository = repositoryFactory.createPropertyDetailRepository();
  }

  async execute(input: { id: string }): Promise<void> {
    this.logger.info({ message: 'Start DeletePropertyDetail Use Case' });
    await this.propertyDetailRepository.delete(input.id);
  }
}
