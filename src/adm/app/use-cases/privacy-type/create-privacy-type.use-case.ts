import { UseCase } from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { PrivacyType } from "../../../domain/entities";
import { RepositoryFactory } from "../../../domain/factory";
import { PrivacyTypeRepository } from "../../../domain/repository";
import {
  CreatePrivacyTypeInput,
  PrivacyTypeOutput,
  PrivacyTypeOutputMapper,
} from "../../dto";

export class CreatePrivacyTypeUseCase
  implements UseCase<CreatePrivacyTypeInput, PrivacyTypeOutput>
{
  privacyTypeRepository: PrivacyTypeRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
  ) {
    this.logger = WinstonLogger.getInstance();
    this.privacyTypeRepository =
      repositoryFactory.createPrivacyTypeRepository();
  }

  async execute(input: CreatePrivacyTypeInput): Promise<PrivacyTypeOutput> {
    this.logger.info({ message: "Start CreatePrivacyType Use Case" });
    const privacyType = new PrivacyType({
      key: input.key,
      name: input.name,
      description: input.description,
    });
    await this.privacyTypeRepository.insert(privacyType);
    return PrivacyTypeOutputMapper.toOutput(privacyType);
  }
}
