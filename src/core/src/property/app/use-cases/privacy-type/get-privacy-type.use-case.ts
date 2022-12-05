import { PrivacyTypeRepository } from '../../../domain/repository';
import { RepositoryFactory } from '../../../domain/factory';
import { Broker, LoggerInterface, SingletonLogger } from '#shared/infra';
import { PrivacyTypeOutput, PrivacyTypeOutputMapper } from '../../dto';
import { UseCase } from '#shared/app';

export class GetPrivacyTypeUseCase
  implements UseCase<{ id: string }, PrivacyTypeOutput>
{
  privacyTypeRepository: PrivacyTypeRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
  ) {
    this.logger = SingletonLogger.getInstance();
    this.privacyTypeRepository =
      repositoryFactory.createPrivacyTypeRepository();
  }

  async execute(input: { id: string }): Promise<PrivacyTypeOutput> {
    this.logger.info({ message: 'Start GetPrivacyType Use Case' });
    const privacyType = await this.privacyTypeRepository.findById(input.id);
    return PrivacyTypeOutputMapper.toOutput(privacyType);
  }
}
