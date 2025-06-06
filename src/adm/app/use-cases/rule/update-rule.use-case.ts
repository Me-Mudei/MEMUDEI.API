import { UseCase } from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { Rule } from "../../../domain/entities";
import { RepositoryFactory } from "../../../domain/factory";
import { RuleRepository } from "../../../domain/repository";
import { UpdateRuleInput, RuleOutput, RuleOutputMapper } from "../../dto";

export class UpdateRuleUseCase implements UseCase<UpdateRuleInput, RuleOutput> {
  ruleRepository: RuleRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker
  ) {
    this.logger = WinstonLogger.getInstance();
    this.ruleRepository = repositoryFactory.createRuleRepository();
  }

  async execute(input: UpdateRuleInput): Promise<RuleOutput> {
    this.logger.info({ message: "Start UpdateRule Use Case" });
    const rule = new Rule({
      key: input.key,
      name: input.name,
      description: input.description
    });
    await this.ruleRepository.update(rule);
    return RuleOutputMapper.toOutput(rule);
  }
}
