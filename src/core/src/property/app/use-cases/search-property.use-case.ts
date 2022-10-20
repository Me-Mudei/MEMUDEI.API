import { PropertyRepository, RepositoryFactory } from '../../domain';
import { Broker } from '../../../shared/infra/';
import { PropertyOutput, PropertyOutputMapper } from '../dto';
import { UseCase } from '../../../shared/app';
import { LoggerInterface } from '../../../shared/infra/logger/logger.interface';
import { SearchInputDto } from '../../../shared/app/dto/search-input.dto';
import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from '../../../shared/app/dto/pagination-output.dto';

export class SearchPropertyUseCase
  implements UseCase<SearchInputDto, PaginationOutputDto<PropertyOutput>>
{
  propertyRepository: PropertyRepository.Repository;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
    readonly logger: LoggerInterface,
  ) {
    this.propertyRepository = repositoryFactory.createPropertyRepository();
  }

  async execute(
    input: SearchInputDto,
  ): Promise<PaginationOutputDto<PropertyOutput>> {
    this.logger.info({ message: 'Start Property Use Case' });
    const params = new PropertyRepository.SearchParams(input);
    const property = await this.propertyRepository.search(params);
    const items = property.items.map((property) =>
      PropertyOutputMapper.toOutput(property),
    );

    return PaginationOutputMapper.toOutput(items, property);
  }
}
