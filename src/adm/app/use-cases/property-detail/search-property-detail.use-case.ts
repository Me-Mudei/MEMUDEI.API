import {
  UseCase,
  SearchInputDto,
  PaginationOutputDto,
  PaginationOutputMapper
} from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { RepositoryFactory } from "../../../domain/factory";
import {
  PropertyDetailRepository,
  PropertyDetailSearchParams
} from "../../../domain/repository";
import { PropertyDetailOutput, PropertyDetailOutputMapper } from "../../dto";

export class SearchPropertyDetailUseCase
  implements UseCase<SearchInputDto, PaginationOutputDto<PropertyDetailOutput>>
{
  propertyDetailRepository: PropertyDetailRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker
  ) {
    this.logger = WinstonLogger.getInstance();
    this.propertyDetailRepository =
      repositoryFactory.createPropertyDetailRepository();
  }

  async execute(
    input: SearchInputDto
  ): Promise<PaginationOutputDto<PropertyDetailOutput>> {
    this.logger.info({ message: "Start SearchPropertyDetail Use Case" });
    const params = new PropertyDetailSearchParams(input);
    const propertyDetail = await this.propertyDetailRepository.search(params);
    const items = propertyDetail.items.map((propertyDetail) =>
      PropertyDetailOutputMapper.toOutput(propertyDetail)
    );

    return PaginationOutputMapper.toOutput(items, propertyDetail);
  }
}
