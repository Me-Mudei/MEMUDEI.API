import { RuleRepository, RepositoryFactory } from '../../../domain';
import { Broker } from '../../../../shared/infra/';
import { UseCase } from '../../../../shared/app';
import { LoggerInterface } from '../../../../shared/infra/logger/logger.interface';

export class DeleteRuleUseCase implements UseCase<{ id: string }, void> {
  ruleRepository: RuleRepository;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
    readonly logger: LoggerInterface,
  ) {
    this.ruleRepository = repositoryFactory.createRuleRepository();
  }

  async execute(input: { id: string }): Promise<void> {
    this.logger.info({ message: 'Start DeleteRule Use Case' });
    await this.ruleRepository.delete(input.id);
  }
}
