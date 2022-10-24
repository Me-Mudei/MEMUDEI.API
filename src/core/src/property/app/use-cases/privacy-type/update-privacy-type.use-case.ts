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

export class UpdatePrivacyTypeUseCase
  implements UseCase<UpdatePrivacyTypeInput, PrivacyTypeOutput>
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

  async execute(input: UpdatePrivacyTypeInput): Promise<PrivacyTypeOutput> {
    this.logger.info({ message: 'Start UpdatePrivacyType Use Case' });
    const privacyType = new PrivacyType({
      name: input.name,
    });
    await this.privacyTypeRepository.update(privacyType);
    return PrivacyTypeOutputMapper.toOutput(privacyType);
  }
}
