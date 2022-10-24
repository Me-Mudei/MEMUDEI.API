import { PrivacyTypeRepository, RepositoryFactory } from '../../../domain';
import { Broker } from '../../../../shared/infra/';
import { PrivacyTypeOutput, PrivacyTypeOutputMapper } from '../../dto';
import { UseCase } from '../../../../shared/app';
import { LoggerInterface } from '../../../../shared/infra/logger/logger.interface';

export class GetPrivacyTypeUseCase
  implements UseCase<{ id: string }, PrivacyTypeOutput>
{
  privacyTypeRepository: PrivacyTypeRepository;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
    readonly logger: LoggerInterface,
  ) {
    this.privacyTypeRepository =
      repositoryFactory.createPrivacyTypeRepository();
  }

  async execute(input: { id: string }): Promise<PrivacyTypeOutput> {
    this.logger.info({ message: 'Start GetPrivacyType Use Case' });
    const privacyType = await this.privacyTypeRepository.findById(input.id);
    return PrivacyTypeOutputMapper.toOutput(privacyType);
  }
}
