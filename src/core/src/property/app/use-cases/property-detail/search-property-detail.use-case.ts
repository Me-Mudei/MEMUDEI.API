import { PropertyDetailRepository, RepositoryFactory } from '../../../domain';
import { Broker } from '../../../../shared/infra/';
import { PropertyDetailOutput, PropertyDetailOutputMapper } from '../../dto';
import { UseCase } from '../../../../shared/app';
import { LoggerInterface } from '../../../../shared/infra/logger/logger.interface';
import { SearchInputDto } from '../../../../shared/app/dto/search-input.dto';
import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from '../../../../shared/app/dto/pagination-output.dto';

export class SearchPropertyDetailUseCase
  implements UseCase<SearchInputDto, PaginationOutputDto<PropertyDetailOutput>>
{
  propertyDetailRepository: PropertyDetailRepository;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
    readonly logger: LoggerInterface,
  ) {
    this.propertyDetailRepository =
      repositoryFactory.createPropertyDetailRepository();
  }

  async execute(
    input: SearchInputDto,
  ): Promise<PaginationOutputDto<PropertyDetailOutput>> {
    this.logger.info({ message: 'Start SearchPropertyDetail Use Case' });
    const params = new PropertyDetailRepository.SearchParams(input);
    const propertyDetail = await this.propertyDetailRepository.search(params);
    const items = propertyDetail.items.map((propertyDetail) =>
      PropertyDetailOutputMapper.toOutput(propertyDetail),
    );

    return PaginationOutputMapper.toOutput(items, propertyDetail);
  }
}
