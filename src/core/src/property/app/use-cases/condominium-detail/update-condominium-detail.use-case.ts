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

export class UpdateCondominiumDetailUseCase
  implements UseCase<UpdateCondominiumDetailInput, CondominiumDetailOutput>
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

  async execute(input: UpdateCondominiumDetailInput): Promise<CondominiumDetailOutput> {
    this.logger.info({ message: 'Start UpdateCondominiumDetail Use Case' });
    const condominiumDetail = new CondominiumDetail({
      name: input.name,
    });
    await this.condominiumDetailRepository.update(condominiumDetail);
    return CondominiumDetailOutputMapper.toOutput(condominiumDetail);
  }
}
