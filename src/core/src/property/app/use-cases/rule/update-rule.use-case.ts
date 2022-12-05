import { RuleRepository } from '../../../domain/repository';
import { RepositoryFactory } from '../../../domain/factory';
import { Rule } from '../../../domain/entities';
import { Broker, LoggerInterface, SingletonLogger } from '#shared/infra';
import { UpdateRuleInput, RuleOutput, RuleOutputMapper } from '../../dto';
import { UseCase } from '#shared/app';

export class UpdateRuleUseCase implements UseCase<UpdateRuleInput, RuleOutput> {
  ruleRepository: RuleRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
  ) {
    this.logger = SingletonLogger.getInstance();
    this.ruleRepository = repositoryFactory.createRuleRepository();
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
