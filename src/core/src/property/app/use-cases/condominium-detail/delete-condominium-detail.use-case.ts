import { CondominiumDetailRepository, RepositoryFactory } from '../../../domain';
import { Broker } from '../../../../shared/infra/';
import { UseCase } from '../../../../shared/app';
import { LoggerInterface } from '../../../../shared/infra/logger/logger.interface';

export class DeleteCondominiumDetailUseCase implements UseCase<{ id: string }, void> {
  condominiumDetailRepository: CondominiumDetailRepository;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
    readonly logger: LoggerInterface,
  ) {
    this.condominiumDetailRepository = repositoryFactory.createCondominiumDetailRepository();
  }

  async execute(input: { id: string }): Promise<void> {
    this.logger.info({ message: 'Start DeleteCondominiumDetail Use Case' });
    await this.condominiumDetailRepository.delete(input.id);
  }
}
