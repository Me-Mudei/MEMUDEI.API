import { PrivacyTypeRepository } from '../../../domain/repository';
import { RepositoryFactory } from '../../../domain/factory';
import { PrivacyType } from '../../../domain/entities';
import { Broker, LoggerInterface, SingletonLogger } from '#shared/infra';
import {
  UpdatePrivacyTypeInput,
  PrivacyTypeOutput,
  PrivacyTypeOutputMapper,
} from '../../dto';
import { UseCase } from '#shared/app';

export class UpdatePrivacyTypeUseCase
  implements UseCase<UpdatePrivacyTypeInput, PrivacyTypeOutput>
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

  async execute(input: UpdatePrivacyTypeInput): Promise<PrivacyTypeOutput> {
    this.logger.info({ message: 'Start UpdatePrivacyType Use Case' });
    const privacyType = new PrivacyType({
      name: input.name,
    });
    await this.privacyTypeRepository.update(privacyType);
    return PrivacyTypeOutputMapper.toOutput(privacyType);
  }
}
