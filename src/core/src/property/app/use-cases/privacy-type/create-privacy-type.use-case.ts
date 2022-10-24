import {
  PrivacyType,
  PrivacyTypeRepository,
  RepositoryFactory,
} from '../../../domain';
import { Broker } from '../../../../shared/infra/';
import {
  CreatePrivacyTypeInput,
  PrivacyTypeOutput,
  PrivacyTypeOutputMapper,
} from '../../dto';
import { UseCase } from '../../../../shared/app';
import { LoggerInterface } from '../../../../shared/infra/logger/logger.interface';

export class CreatePrivacyTypeUseCase
  implements UseCase<CreatePrivacyTypeInput, PrivacyTypeOutput>
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

  async execute(input: CreatePrivacyTypeInput): Promise<PrivacyTypeOutput> {
    this.logger.info({ message: 'Start CreatePrivacyType Use Case' });
    const privacyType = new PrivacyType({
      name: input.name,
    });
    await this.privacyTypeRepository.insert(privacyType);
    return PrivacyTypeOutputMapper.toOutput(privacyType);
  }
}
