import { UseCase } from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { RepositoryFactory } from "../../domain/factory";
import { PropertyRepository } from "../../domain/repository";
import {
  UpdatePropertyInput,
  UpdatePropertyOutput,
  UpdatePropertyOutputMapper
} from "../dto";

export class UpdatePropertyUseCase
  implements UseCase<UpdatePropertyInput, UpdatePropertyOutput>
{
  propertyRepository: PropertyRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker
  ) {
    this.logger = WinstonLogger.getInstance();
    this.propertyRepository = repositoryFactory.createPropertyRepository();
  }

  async execute(input: UpdatePropertyInput): Promise<UpdatePropertyOutput> {
    this.logger.info({ message: "Start Property Use Case" });
    await this.propertyRepository.update(input);
    const property = await this.propertyRepository.findById(input.id);
    return UpdatePropertyOutputMapper.toOutput(property);
  }
}
