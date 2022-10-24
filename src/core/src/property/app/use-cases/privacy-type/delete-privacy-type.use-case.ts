import { PrivacyTypeRepository, RepositoryFactory } from '../../../domain';
import { Broker } from '../../../../shared/infra/';
import { UseCase } from '../../../../shared/app';
import { LoggerInterface } from '../../../../shared/infra/logger/logger.interface';

export class DeletePrivacyTypeUseCase implements UseCase<{ id: string }, void> {
  privacyTypeRepository: PrivacyTypeRepository;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
    readonly logger: LoggerInterface,
  ) {
    this.privacyTypeRepository = repositoryFactory.createPrivacyTypeRepository();
  }

  async execute(input: { id: string }): Promise<void> {
    this.logger.info({ message: 'Start DeletePrivacyType Use Case' });
    await this.privacyTypeRepository.delete(input.id);
  }
}
