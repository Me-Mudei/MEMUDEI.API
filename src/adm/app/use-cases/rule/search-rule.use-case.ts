import {
  UseCase,
  SearchInputDto,
  PaginationOutputDto,
  PaginationOutputMapper,
} from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { RepositoryFactory } from "../../../domain/factory";
import { RuleRepository, RuleSearchParams } from "../../../domain/repository";
import { RuleOutput, RuleOutputMapper } from "../../dto";

export class SearchRuleUseCase
  implements UseCase<SearchInputDto, PaginationOutputDto<RuleOutput>>
{
  ruleRepository: RuleRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
  ) {
    this.logger = WinstonLogger.getInstance();
    this.ruleRepository = repositoryFactory.createRuleRepository();
  }

  async execute(
    input: SearchInputDto,
  ): Promise<PaginationOutputDto<RuleOutput>> {
    this.logger.info({ message: "Start SearchRule Use Case" });
    const params = new RuleSearchParams(input);
    const rule = await this.ruleRepository.search(params);
    const items = rule.items.map((rule) => RuleOutputMapper.toOutput(rule));

    return PaginationOutputMapper.toOutput(items, rule);
  }
}
