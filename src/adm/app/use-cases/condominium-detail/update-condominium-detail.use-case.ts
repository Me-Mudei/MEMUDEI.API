import { UseCase } from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { CondominiumDetail } from "../../../domain/entities";
import { RepositoryFactory } from "../../../domain/factory";
import { CondominiumDetailRepository } from "../../../domain/repository";
import {
  UpdateCondominiumDetailInput,
  CondominiumDetailOutput,
  CondominiumDetailOutputMapper
} from "../../dto";

export class UpdateCondominiumDetailUseCase
  implements UseCase<UpdateCondominiumDetailInput, CondominiumDetailOutput>
{
  condominiumDetailRepository: CondominiumDetailRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker
  ) {
    this.logger = WinstonLogger.getInstance();
    this.condominiumDetailRepository =
      repositoryFactory.createCondominiumDetailRepository();
  }

  async execute(
    input: UpdateCondominiumDetailInput
  ): Promise<CondominiumDetailOutput> {
    this.logger.info({ message: "Start UpdateCondominiumDetail Use Case" });
    const condominiumDetail = new CondominiumDetail({
      key: input.key,
      name: input.name,
      description: input.description
    });
    await this.condominiumDetailRepository.update(condominiumDetail);
    return CondominiumDetailOutputMapper.toOutput(condominiumDetail);
  }
}
