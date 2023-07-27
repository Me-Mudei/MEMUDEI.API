import {
  UseCase,
  SearchInputDto,
  PaginationOutputDto,
  PaginationOutputMapper
} from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { RepositoryFactory } from "../../../domain/factory";
import {
  PropertyTypeRepository,
  PropertyTypeSearchParams
} from "../../../domain/repository";
import { PropertyTypeOutput, PropertyTypeOutputMapper } from "../../dto";

export class SearchPropertyTypeUseCase
  implements UseCase<SearchInputDto, PaginationOutputDto<PropertyTypeOutput>>
{
  propertyTypeRepository: PropertyTypeRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker
  ) {
    this.logger = WinstonLogger.getInstance();
    this.propertyTypeRepository =
      repositoryFactory.createPropertyTypeRepository();
  }

  async execute(
    input: SearchInputDto
  ): Promise<PaginationOutputDto<PropertyTypeOutput>> {
    this.logger.info({ message: "Start SearchPropertyType Use Case" });
    const params = new PropertyTypeSearchParams(input);
    const propertyType = await this.propertyTypeRepository.search(params);
    const items = propertyType.items.map((propertyType) =>
      PropertyTypeOutputMapper.toOutput(propertyType)
    );

    return PaginationOutputMapper.toOutput(items, propertyType);
  }
}
