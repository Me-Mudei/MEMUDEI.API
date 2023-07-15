import { UseCase } from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { RepositoryFactory } from "../../../domain/factory";
import { PropertyTypeRepository } from "../../../domain/repository";

export class DeletePropertyTypeUseCase
  implements UseCase<{ id: string }, void>
{
  propertyTypeRepository: PropertyTypeRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker
  ) {
    this.logger = WinstonLogger.getInstance();
    this.propertyTypeRepository =
      repositoryFactory.createPropertyTypeRepository();
  }

  async execute(input: { id: string }): Promise<void> {
    this.logger.info({ message: "Start DeletePropertyType Use Case" });
    await this.propertyTypeRepository.delete(input.id);
  }
}
