import { RuleRepository, RepositoryFactory } from '../../../domain';
import { Broker } from '../../../../shared/infra/';
import { RuleOutput, RuleOutputMapper } from '../../dto';
import { UseCase } from '../../../../shared/app';
import { LoggerInterface } from '../../../../shared/infra/logger/logger.interface';
import { SearchInputDto } from '../../../../shared/app/dto/search-input.dto';
import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from '../../../../shared/app/dto/pagination-output.dto';

export class SearchRuleUseCase
  implements UseCase<SearchInputDto, PaginationOutputDto<RuleOutput>>
{
  ruleRepository: RuleRepository;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
    readonly logger: LoggerInterface,
  ) {
    this.ruleRepository = repositoryFactory.createRuleRepository();
  }

  async execute(
    input: SearchInputDto,
  ): Promise<PaginationOutputDto<RuleOutput>> {
    this.logger.info({ message: 'Start SearchRule Use Case' });
    const params = new RuleRepository.SearchParams(input);
    const rule = await this.ruleRepository.search(params);
    const items = rule.items.map((rule) => RuleOutputMapper.toOutput(rule));

    return PaginationOutputMapper.toOutput(items, rule);
  }
}
