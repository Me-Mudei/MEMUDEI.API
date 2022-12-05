import { RuleRepository } from '../../../domain/repository';
import { RepositoryFactory } from '../../../domain/factory';
import { Rule } from '../../../domain/entities';
import { Broker, LoggerInterface, SingletonLogger } from '#shared/infra';
import { CreateRuleInput, RuleOutput, RuleOutputMapper } from '../../dto';
import { UseCase } from '#shared/app';

export class CreateRuleUseCase implements UseCase<CreateRuleInput, RuleOutput> {
  ruleRepository: RuleRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
  ) {
    this.logger = SingletonLogger.getInstance();
    this.ruleRepository = repositoryFactory.createRuleRepository();
  }

  async execute(input: CreateRuleInput): Promise<RuleOutput> {
    this.logger.info({ message: 'Start CreateRule Use Case' });
    const rule = new Rule({
      name: input.name,
    });
    await this.ruleRepository.insert(rule);
    return RuleOutputMapper.toOutput(rule);
  }
}
