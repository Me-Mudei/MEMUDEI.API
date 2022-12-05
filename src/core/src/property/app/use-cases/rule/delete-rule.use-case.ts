import { RuleRepository } from '../../../domain/repository';
import { RepositoryFactory } from '../../../domain/factory';
import { Broker, LoggerInterface, SingletonLogger } from '#shared/infra';
import { UseCase } from '#shared/app';

export class DeleteRuleUseCase implements UseCase<{ id: string }, void> {
  ruleRepository: RuleRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
  ) {
    this.logger = SingletonLogger.getInstance();
    this.ruleRepository = repositoryFactory.createRuleRepository();
  }

  async execute(input: { id: string }): Promise<void> {
    this.logger.info({ message: 'Start DeleteRule Use Case' });
    await this.ruleRepository.delete(input.id);
  }
}
