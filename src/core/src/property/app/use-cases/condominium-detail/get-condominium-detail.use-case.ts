import {
  CondominiumDetailRepository,
  RepositoryFactory,
} from '../../../domain';
import { Broker } from '../../../../shared/infra/';
import {
  CondominiumDetailOutput,
  CondominiumDetailOutputMapper,
} from '../../dto';
import { UseCase } from '../../../../shared/app';
import { LoggerInterface } from '../../../../shared/infra/logger/logger.interface';

export class GetCondominiumDetailUseCase
  implements UseCase<{ id: string }, CondominiumDetailOutput>
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

  async execute(input: { id: string }): Promise<CondominiumDetailOutput> {
    this.logger.info({ message: 'Start GetCondominiumDetail Use Case' });
    const condominiumDetail = await this.condominiumDetailRepository.findById(
      input.id,
    );
    return CondominiumDetailOutputMapper.toOutput(condominiumDetail);
  }
}
