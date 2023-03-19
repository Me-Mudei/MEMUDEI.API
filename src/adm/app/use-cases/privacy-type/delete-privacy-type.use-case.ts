import { PrivacyTypeRepository } from '../../../domain/repository';
import { RepositoryFactory } from '../../../domain/factory';
import { Broker, LoggerInterface, WinstonLogger } from '#shared/infra';
import { UseCase } from '#shared/app';

export class DeletePrivacyTypeUseCase implements UseCase<{ id: string }, void> {
  privacyTypeRepository: PrivacyTypeRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
  ) {
    this.logger = WinstonLogger.getInstance();
    this.privacyTypeRepository =
      repositoryFactory.createPrivacyTypeRepository();
  }

  async execute(input: { id: string }): Promise<void> {
    this.logger.info({ message: 'Start DeletePrivacyType Use Case' });
    await this.privacyTypeRepository.delete(input.id);
  }
}
