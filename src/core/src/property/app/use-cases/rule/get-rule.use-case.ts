import { RuleRepository } from '../../../domain/repository';
import { RepositoryFactory } from '../../../domain/factory';
import { Broker, LoggerInterface, SingletonLogger } from '#shared/infra';
import { RuleOutput, RuleOutputMapper } from '../../dto';
import { UseCase } from '#shared/app';

export class GetRuleUseCase implements UseCase<{ id: string }, RuleOutput> {
  ruleRepository: RuleRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
  ) {
    this.logger = SingletonLogger.getInstance();
    this.ruleRepository = repositoryFactory.createRuleRepository();
  }

  async execute(input: { id: string }): Promise<RuleOutput> {
    this.logger.info({ message: 'Start GetRule Use Case' });
    const rule = await this.ruleRepository.findById(input.id);
    return RuleOutputMapper.toOutput(rule);
  }
}
