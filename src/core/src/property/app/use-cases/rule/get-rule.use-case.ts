import { RuleRepository, RepositoryFactory } from '../../../domain';
import { Broker } from '../../../../shared/infra/';
import { RuleOutput, RuleOutputMapper } from '../../dto';
import { UseCase } from '../../../../shared/app';
import { LoggerInterface } from '../../../../shared/infra/logger/logger.interface';

export class GetRuleUseCase implements UseCase<{ id: string }, RuleOutput> {
  ruleRepository: RuleRepository;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
    readonly logger: LoggerInterface,
  ) {
    this.ruleRepository = repositoryFactory.createRuleRepository();
  }

  async execute(input: { id: string }): Promise<RuleOutput> {
    this.logger.info({ message: 'Start GetRule Use Case' });
    const rule = await this.ruleRepository.findById(input.id);
    return RuleOutputMapper.toOutput(rule);
  }
}
