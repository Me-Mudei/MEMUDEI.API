import { UseCase } from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { Charge } from "../../../domain/entities";
import { RepositoryFactory } from "../../../domain/factory";
import { ChargeRepository } from "../../../domain/repository";
import { CreateChargeInput, ChargeOutput, ChargeOutputMapper } from "../../dto";

export class CreateChargeUseCase
  implements UseCase<CreateChargeInput, ChargeOutput>
{
  chargeRepository: ChargeRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
  ) {
    this.logger = WinstonLogger.getInstance();
    this.chargeRepository = repositoryFactory.createChargeRepository();
  }

  async execute(input: CreateChargeInput): Promise<ChargeOutput> {
    this.logger.info({ message: "Start CreateCharge Use Case" });
    const charge = new Charge({
      key: input.key,
      name: input.name,
      description: input.description,
    });
    await this.chargeRepository.insert(charge);
    return ChargeOutputMapper.toOutput(charge);
  }
}
