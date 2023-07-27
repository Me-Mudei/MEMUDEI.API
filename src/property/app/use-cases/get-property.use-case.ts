import { UseCase } from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { RepositoryFactory } from "../../domain/factory";
import { PropertyRepository } from "../../domain/repository";
import { PropertyOutput, PropertyOutputMapper } from "../dto";

export class GetPropertyUseCase
  implements UseCase<{ id: string }, PropertyOutput>
{
  private propertyRepository: PropertyRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker
  ) {
    this.logger = WinstonLogger.getInstance();
    this.propertyRepository = repositoryFactory.createPropertyRepository();
  }

  async execute(input: { id: string }): Promise<PropertyOutput> {
    this.logger.info({ message: "Start Property Use Case" });
    const property = await this.propertyRepository.findById(input.id);
    return PropertyOutputMapper.toOutput(property);
  }
}
