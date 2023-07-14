import {
  PropertyFilter,
  PropertyRepository,
  PropertySearchParams,
} from '../../domain/repository';
import { RepositoryFactory } from '../../domain/factory';
import { PropertyOutput, PropertyOutputMapper } from '../dto';
import { Broker, LoggerInterface, WinstonLogger } from '#shared/infra';
import {
  UseCase,
  SearchInputDto,
  PaginationOutputDto,
  PaginationOutputMapper,
} from '#shared/app';

export class SearchPropertyUseCase
  implements
    UseCase<
      SearchInputDto<PropertyFilter>,
      PaginationOutputDto<PropertyOutput>
    >
{
  propertyRepository: PropertyRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
  ) {
    this.logger = WinstonLogger.getInstance();
    this.propertyRepository = repositoryFactory.createPropertyRepository();
  }

  async execute(
    input: SearchInputDto<PropertyFilter>,
  ): Promise<PaginationOutputDto<PropertyOutput>> {
    this.logger.info({ message: 'Start Search Property Use Case' });
    const params = new PropertySearchParams(input);
    const result = await this.propertyRepository.search(params);
    const items = result.items.map((property) =>
      PropertyOutputMapper.toOutput(property),
    );
    this.logger.info({ message: 'End Search Property Use Case' });
    return PaginationOutputMapper.toOutput(items, result);
  }
}
