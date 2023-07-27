import { UseCase } from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { Rule } from "../../../domain/entities";
import { RepositoryFactory } from "../../../domain/factory";
import { RuleRepository } from "../../../domain/repository";
import { CreateRuleInput, RuleOutput, RuleOutputMapper } from "../../dto";

export class CreateRuleUseCase implements UseCase<CreateRuleInput, RuleOutput> {
  ruleRepository: RuleRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker
  ) {
    this.logger = WinstonLogger.getInstance();
    this.ruleRepository = repositoryFactory.createRuleRepository();
  }

  async execute(input: CreateRuleInput): Promise<RuleOutput> {
    this.logger.info({ message: "Start CreateRule Use Case" });
    const rule = new Rule({
      key: input.key,
      name: input.name,
      description: input.description
    });
    await this.ruleRepository.insert(rule);
    return RuleOutputMapper.toOutput(rule);
  }
}
