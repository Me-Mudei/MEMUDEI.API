import {
  UseCase,
  SearchInputDto,
  PaginationOutputDto,
  PaginationOutputMapper,
} from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { RepositoryFactory } from "../../../domain/factory";
import {
  PropertyRelationshipRepository,
  PropertyRelationshipSearchParams,
} from "../../../domain/repository";
import {
  PropertyRelationshipOutput,
  PropertyRelationshipOutputMapper,
} from "../../dto";

export class SearchPropertyRelationshipUseCase
  implements
    UseCase<SearchInputDto, PaginationOutputDto<PropertyRelationshipOutput>>
{
  propertyRelationshipRepository: PropertyRelationshipRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
  ) {
    this.logger = WinstonLogger.getInstance();
    this.propertyRelationshipRepository =
      repositoryFactory.createPropertyRelationshipRepository();
  }

  async execute(
    input: SearchInputDto,
  ): Promise<PaginationOutputDto<PropertyRelationshipOutput>> {
    this.logger.info({ message: "Start SearchPropertyRelationship Use Case" });
    const params = new PropertyRelationshipSearchParams(input);
    const propertyRelationship =
      await this.propertyRelationshipRepository.search(params);
    const items = propertyRelationship.items.map((propertyRelationship) =>
      PropertyRelationshipOutputMapper.toOutput(propertyRelationship),
    );

    return PaginationOutputMapper.toOutput(items, propertyRelationship);
  }
}
