import { PropertyTypeRepository, RepositoryFactory } from '../../../domain';
import { Broker } from '../../../../shared/infra/';
import { PropertyTypeOutput, PropertyTypeOutputMapper } from '../../dto';
import { UseCase } from '../../../../shared/app';
import { LoggerInterface } from '../../../../shared/infra/logger/logger.interface';
import { SearchInputDto } from '../../../../shared/app/dto/search-input.dto';
import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from '../../../../shared/app/dto/pagination-output.dto';

export class SearchPropertyTypeUseCase
  implements UseCase<SearchInputDto, PaginationOutputDto<PropertyTypeOutput>>
{
  propertyTypeRepository: PropertyTypeRepository;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
    readonly logger: LoggerInterface,
  ) {
    this.propertyTypeRepository =
      repositoryFactory.createPropertyTypeRepository();
  }

  async execute(
    input: SearchInputDto,
  ): Promise<PaginationOutputDto<PropertyTypeOutput>> {
    this.logger.info({ message: 'Start SearchPropertyType Use Case' });
    const params = new PropertyTypeRepository.SearchParams(input);
    const propertyType = await this.propertyTypeRepository.search(params);
    const items = propertyType.items.map((propertyType) =>
      PropertyTypeOutputMapper.toOutput(propertyType),
    );

    return PaginationOutputMapper.toOutput(items, propertyType);
  }
}
