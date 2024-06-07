import { UseCase } from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { RepositoryFactory } from "../../../domain/factory";
import { ChargeRepository } from "../../../domain/repository";
import { ChargeOutput, ChargeOutputMapper } from "../../dto";

export class GetChargeUseCase implements UseCase<{ id: string }, ChargeOutput> {
  chargeRepository: ChargeRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
  ) {
    this.logger = WinstonLogger.getInstance();
    this.chargeRepository = repositoryFactory.createChargeRepository();
  }

  async execute(input: { id: string }): Promise<ChargeOutput> {
    this.logger.info({ message: "Start GetCharge Use Case" });
    const charge = await this.chargeRepository.findById(input.id);
    return ChargeOutputMapper.toOutput(charge);
  }
}
