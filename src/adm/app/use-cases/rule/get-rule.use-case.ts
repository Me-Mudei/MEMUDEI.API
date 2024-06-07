import { UseCase } from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { RepositoryFactory } from "../../../domain/factory";
import { RuleRepository } from "../../../domain/repository";
import { RuleOutput, RuleOutputMapper } from "../../dto";

export class GetRuleUseCase implements UseCase<{ id: string }, RuleOutput> {
  ruleRepository: RuleRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
  ) {
    this.logger = WinstonLogger.getInstance();
    this.ruleRepository = repositoryFactory.createRuleRepository();
  }

  async execute(input: { id: string }): Promise<RuleOutput> {
    this.logger.info({ message: "Start GetRule Use Case" });
    const rule = await this.ruleRepository.findById(input.id);
    return RuleOutputMapper.toOutput(rule);
  }
}
