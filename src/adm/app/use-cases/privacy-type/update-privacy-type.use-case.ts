import { UseCase } from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { PrivacyType } from "../../../domain/entities";
import { RepositoryFactory } from "../../../domain/factory";
import { PrivacyTypeRepository } from "../../../domain/repository";
import {
  UpdatePrivacyTypeInput,
  PrivacyTypeOutput,
  PrivacyTypeOutputMapper
} from "../../dto";

export class UpdatePrivacyTypeUseCase
  implements UseCase<UpdatePrivacyTypeInput, PrivacyTypeOutput>
{
  privacyTypeRepository: PrivacyTypeRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker
  ) {
    this.logger = WinstonLogger.getInstance();
    this.privacyTypeRepository =
      repositoryFactory.createPrivacyTypeRepository();
  }

  async execute(input: UpdatePrivacyTypeInput): Promise<PrivacyTypeOutput> {
    this.logger.info({ message: "Start UpdatePrivacyType Use Case" });
    const privacyType = new PrivacyType({
      key: input.key,
      name: input.name,
      description: input.description
    });
    await this.privacyTypeRepository.update(privacyType);
    return PrivacyTypeOutputMapper.toOutput(privacyType);
  }
}
