import { CondominiumDetailRepository } from '../../../domain/repository';
import { RepositoryFactory } from '../../../domain/factory';
import { Broker, LoggerInterface, SingletonLogger } from '#shared/infra';
import { UseCase } from '#shared/app';

export class DeleteCondominiumDetailUseCase
  implements UseCase<{ id: string }, void>
{
  condominiumDetailRepository: CondominiumDetailRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
  ) {
    this.logger = SingletonLogger.getInstance();
    this.condominiumDetailRepository =
      repositoryFactory.createCondominiumDetailRepository();
  }

  async execute(input: { id: string }): Promise<void> {
    this.logger.info({ message: 'Start DeleteCondominiumDetail Use Case' });
    await this.condominiumDetailRepository.delete(input.id);
  }
}
