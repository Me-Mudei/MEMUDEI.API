import { UseCase } from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { Charge } from "../../../domain/entities";
import { RepositoryFactory } from "../../../domain/factory";
import { ChargeRepository } from "../../../domain/repository";
import { UpdateChargeInput, ChargeOutput, ChargeOutputMapper } from "../../dto";

export class UpdateChargeUseCase
  implements UseCase<UpdateChargeInput, ChargeOutput>
{
  chargeRepository: ChargeRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker
  ) {
    this.logger = WinstonLogger.getInstance();
    this.chargeRepository = repositoryFactory.createChargeRepository();
  }

  async execute(input: UpdateChargeInput): Promise<ChargeOutput> {
    this.logger.info({ message: "Start UpdateCharge Use Case" });
    const charge = new Charge({
      key: input.key,
      name: input.name,
      description: input.description
    });
    await this.chargeRepository.update(charge);
    return ChargeOutputMapper.toOutput(charge);
  }
}
