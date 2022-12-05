import { PropertyDetailRepository } from '../../../domain/repository';
import { RepositoryFactory } from '../../../domain/factory';
import { Broker, LoggerInterface, SingletonLogger } from '#shared/infra';
import { UseCase } from '#shared/app';

export class DeletePropertyDetailUseCase
  implements UseCase<{ id: string }, void>
{
  propertyDetailRepository: PropertyDetailRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
  ) {
    this.logger = SingletonLogger.getInstance();
    this.propertyDetailRepository =
      repositoryFactory.createPropertyDetailRepository();
  }

  async execute(input: { id: string }): Promise<void> {
    this.logger.info({ message: 'Start DeletePropertyDetail Use Case' });
    await this.propertyDetailRepository.delete(input.id);
  }
}
