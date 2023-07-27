import {
  UseCase,
  SearchInputDto,
  PaginationOutputDto,
  PaginationOutputMapper
} from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { RepositoryFactory } from "../../../domain/factory";
import {
  ChargeRepository,
  ChargeSearchParams
} from "../../../domain/repository";
import { ChargeOutput, ChargeOutputMapper } from "../../dto";

export class SearchChargeUseCase
  implements UseCase<SearchInputDto, PaginationOutputDto<ChargeOutput>>
{
  chargeRepository: ChargeRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker
  ) {
    this.logger = WinstonLogger.getInstance();
    this.chargeRepository = repositoryFactory.createChargeRepository();
  }

  async execute(
    input: SearchInputDto
  ): Promise<PaginationOutputDto<ChargeOutput>> {
    this.logger.info({ message: "Start SearchCharge Use Case" });
    const params = new ChargeSearchParams(input);
    const charge = await this.chargeRepository.search(params);
    const items = charge.items.map((charge) =>
      ChargeOutputMapper.toOutput(charge)
    );

    return PaginationOutputMapper.toOutput(items, charge);
  }
}
