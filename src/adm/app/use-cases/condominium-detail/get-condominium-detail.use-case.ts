import { UseCase } from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { RepositoryFactory } from "../../../domain/factory";
import { CondominiumDetailRepository } from "../../../domain/repository";
import {
  CondominiumDetailOutput,
  CondominiumDetailOutputMapper
} from "../../dto";

export class GetCondominiumDetailUseCase
  implements UseCase<{ id: string }, CondominiumDetailOutput>
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

  async execute(input: { id: string }): Promise<CondominiumDetailOutput> {
    this.logger.info({ message: "Start GetCondominiumDetail Use Case" });
    const condominiumDetail = await this.condominiumDetailRepository.findById(
      input.id
    );
    return CondominiumDetailOutputMapper.toOutput(condominiumDetail);
  }
}
