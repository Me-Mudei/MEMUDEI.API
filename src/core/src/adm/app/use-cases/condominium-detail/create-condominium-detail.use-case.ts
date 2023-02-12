import { CondominiumDetailRepository } from '../../../domain/repository';
import { RepositoryFactory } from '../../../domain/factory';
import { CondominiumDetail } from '../../../domain/entities';
import { Broker, LoggerInterface, WinstonLogger } from '#shared/infra';
import {
  CreateCondominiumDetailInput,
  CondominiumDetailOutput,
  CondominiumDetailOutputMapper,
} from '../../dto';
import { UseCase } from '#shared/app';

export class CreateCondominiumDetailUseCase
  implements UseCase<CreateCondominiumDetailInput, CondominiumDetailOutput>
{
  condominiumDetailRepository: CondominiumDetailRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
  ) {
    this.logger = WinstonLogger.getInstance();
    this.condominiumDetailRepository =
      repositoryFactory.createCondominiumDetailRepository();
  }

  async execute(
    input: CreateCondominiumDetailInput,
  ): Promise<CondominiumDetailOutput> {
    this.logger.info({ message: 'Start CreateCondominiumDetail Use Case' });
    const condominiumDetail = new CondominiumDetail({
      name: input.name,
      description: input.description,
    });
    await this.condominiumDetailRepository.insert(condominiumDetail);
    return CondominiumDetailOutputMapper.toOutput(condominiumDetail);
  }
}
