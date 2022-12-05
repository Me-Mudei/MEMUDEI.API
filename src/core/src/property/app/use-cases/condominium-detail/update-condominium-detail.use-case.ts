import { CondominiumDetailRepository } from '../../../domain/repository';
import { RepositoryFactory } from '../../../domain/factory';
import { CondominiumDetail } from '../../../domain/entities';
import { Broker, LoggerInterface, SingletonLogger } from '#shared/infra';
import {
  UpdateCondominiumDetailInput,
  CondominiumDetailOutput,
  CondominiumDetailOutputMapper,
} from '../../dto';
import { UseCase } from '#shared/app';

export class UpdateCondominiumDetailUseCase
  implements UseCase<UpdateCondominiumDetailInput, CondominiumDetailOutput>
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

  async execute(
    input: UpdateCondominiumDetailInput,
  ): Promise<CondominiumDetailOutput> {
    this.logger.info({ message: 'Start UpdateCondominiumDetail Use Case' });
    const condominiumDetail = new CondominiumDetail({
      name: input.name,
    });
    await this.condominiumDetailRepository.update(condominiumDetail);
    return CondominiumDetailOutputMapper.toOutput(condominiumDetail);
  }
}
