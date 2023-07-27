import {
  UseCase,
  SearchInputDto,
  PaginationOutputDto,
  PaginationOutputMapper
} from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { RepositoryFactory } from "../../../domain/factory";
import {
  PrivacyTypeRepository,
  PrivacyTypeSearchParams
} from "../../../domain/repository";
import { PrivacyTypeOutput, PrivacyTypeOutputMapper } from "../../dto";

export class SearchPrivacyTypeUseCase
  implements UseCase<SearchInputDto, PaginationOutputDto<PrivacyTypeOutput>>
{
  privacyTypeRepository: PrivacyTypeRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker
  ) {
    this.logger = WinstonLogger.getInstance();
    this.privacyTypeRepository =
      repositoryFactory.createPrivacyTypeRepository();
  }

  async execute(
    input: SearchInputDto
  ): Promise<PaginationOutputDto<PrivacyTypeOutput>> {
    this.logger.info({ message: "Start SearchPrivacyType Use Case" });
    const params = new PrivacyTypeSearchParams(input);
    const privacyType = await this.privacyTypeRepository.search(params);
    const items = privacyType.items.map((privacyType) =>
      PrivacyTypeOutputMapper.toOutput(privacyType)
    );

    return PaginationOutputMapper.toOutput(items, privacyType);
  }
}
