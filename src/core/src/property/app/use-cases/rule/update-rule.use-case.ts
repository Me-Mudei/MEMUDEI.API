import {
  Rule,
  RuleRepository,
  RepositoryFactory,
} from '../../../domain';
import { Broker } from '../../../../shared/infra/';
import {
  CreateRuleInput,
  RuleOutput,
  RuleOutputMapper,
} from '../../dto';
import { UseCase } from '../../../../shared/app';
import { LoggerInterface } from '../../../../shared/infra/logger/logger.interface';

export class UpdateRuleUseCase
  implements UseCase<UpdateRuleInput, RuleOutput>
{
  ruleRepository: RuleRepository;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
    readonly logger: LoggerInterface,
  ) {
    this.ruleRepository =
      repositoryFactory.createRuleRepository();
  }

  async execute(input: UpdateRuleInput): Promise<RuleOutput> {
    this.logger.info({ message: 'Start UpdateRule Use Case' });
    const rule = new Rule({
      name: input.name,
    });
    await this.ruleRepository.update(rule);
    return RuleOutputMapper.toOutput(rule);
  }
}
