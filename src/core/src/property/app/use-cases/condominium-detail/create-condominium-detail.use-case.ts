import {
  CondominiumDetail,
  CondominiumDetailRepository,
  RepositoryFactory,
} from '../../../domain';
import { Broker } from '../../../../shared/infra/';
import {
  CreateCondominiumDetailInput,
  CondominiumDetailOutput,
  CondominiumDetailOutputMapper,
} from '../../dto';
import { UseCase } from '../../../../shared/app';
import { LoggerInterface } from '../../../../shared/infra/logger/logger.interface';

export class CreateCondominiumDetailUseCase
  implements UseCase<CreateCondominiumDetailInput, CondominiumDetailOutput>
{
  condominiumDetailRepository: CondominiumDetailRepository;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
    readonly logger: LoggerInterface,
  ) {
    this.condominiumDetailRepository =
      repositoryFactory.createCondominiumDetailRepository();
  }

  async execute(
    input: CreateCondominiumDetailInput,
  ): Promise<CondominiumDetailOutput> {
    this.logger.info({ message: 'Start CreateCondominiumDetail Use Case' });
    const condominiumDetail = new CondominiumDetail({
      name: input.name,
    });
    await this.condominiumDetailRepository.insert(condominiumDetail);
    return CondominiumDetailOutputMapper.toOutput(condominiumDetail);
  }
}
