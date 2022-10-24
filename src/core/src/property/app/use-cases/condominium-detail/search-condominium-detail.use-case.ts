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
import { SearchInputDto } from '../../../../shared/app/dto/search-input.dto';
import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from '../../../../shared/app/dto/pagination-output.dto';

export class SearchCondominiumDetailUseCase
  implements
    UseCase<SearchInputDto, PaginationOutputDto<CondominiumDetailOutput>>
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
    input: SearchInputDto,
  ): Promise<PaginationOutputDto<CondominiumDetailOutput>> {
    this.logger.info({ message: 'Start SearchCondominiumDetail Use Case' });
    const params = new CondominiumDetailRepository.SearchParams(input);
    const condominiumDetail = await this.condominiumDetailRepository.search(
      params,
    );
    const items = condominiumDetail.items.map((condominiumDetail) =>
      CondominiumDetailOutputMapper.toOutput(condominiumDetail),
    );

    return PaginationOutputMapper.toOutput(items, condominiumDetail);
  }
}
