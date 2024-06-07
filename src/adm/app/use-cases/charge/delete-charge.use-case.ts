import { UseCase } from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { RepositoryFactory } from "../../../domain/factory";
import { ChargeRepository } from "../../../domain/repository";

export class DeleteChargeUseCase implements UseCase<{ id: string }, void> {
  chargeRepository: ChargeRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
  ) {
    this.logger = WinstonLogger.getInstance();
    this.chargeRepository = repositoryFactory.createChargeRepository();
  }

  async execute(input: { id: string }): Promise<void> {
    this.logger.info({ message: "Start DeleteCharge Use Case" });
    await this.chargeRepository.delete(input.id);
  }
}
