import {
  PropertyTypeRepository,
  PropertyTypeSearchParams,
} from '../../../domain/repository';
import { RepositoryFactory } from '../../../domain/factory';
import { Broker, LoggerInterface, SingletonLogger } from '#shared/infra';
import { PropertyTypeOutput, PropertyTypeOutputMapper } from '../../dto';
import {
  UseCase,
  SearchInputDto,
  PaginationOutputDto,
  PaginationOutputMapper,
} from '#shared/app';

export class SearchPropertyTypeUseCase
  implements UseCase<SearchInputDto, PaginationOutputDto<PropertyTypeOutput>>
{
  propertyTypeRepository: PropertyTypeRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
  ) {
    this.logger = SingletonLogger.getInstance();
    this.propertyTypeRepository =
      repositoryFactory.createPropertyTypeRepository();
  }

  async execute(
    input: SearchInputDto,
  ): Promise<PaginationOutputDto<PropertyTypeOutput>> {
    this.logger.info({ message: 'Start SearchPropertyType Use Case' });
    const params = new PropertyTypeSearchParams(input);
    const propertyType = await this.propertyTypeRepository.search(params);
    const items = propertyType.items.map((propertyType) =>
      PropertyTypeOutputMapper.toOutput(propertyType),
    );

    return PaginationOutputMapper.toOutput(items, propertyType);
  }
}
