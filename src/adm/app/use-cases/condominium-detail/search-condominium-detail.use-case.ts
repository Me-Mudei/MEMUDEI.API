import {
  UseCase,
  SearchInputDto,
  PaginationOutputDto,
  PaginationOutputMapper
} from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { RepositoryFactory } from "../../../domain/factory";
import {
  CondominiumDetailRepository,
  CondominiumDetailSearchParams
} from "../../../domain/repository";
import {
  CondominiumDetailOutput,
  CondominiumDetailOutputMapper
} from "../../dto";

export class SearchCondominiumDetailUseCase
  implements
    UseCase<SearchInputDto, PaginationOutputDto<CondominiumDetailOutput>>
{
  condominiumDetailRepository: CondominiumDetailRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker
  ) {
    this.logger = WinstonLogger.getInstance();
    this.condominiumDetailRepository =
      repositoryFactory.createCondominiumDetailRepository();
  }

  async execute(
    input: SearchInputDto
  ): Promise<PaginationOutputDto<CondominiumDetailOutput>> {
    this.logger.info({ message: "Start SearchCondominiumDetail Use Case" });
    const params = new CondominiumDetailSearchParams(input);
    const condominiumDetail = await this.condominiumDetailRepository.search(
      params
    );
    const items = condominiumDetail.items.map((condominiumDetail) =>
      CondominiumDetailOutputMapper.toOutput(condominiumDetail)
    );

    return PaginationOutputMapper.toOutput(items, condominiumDetail);
  }
}
