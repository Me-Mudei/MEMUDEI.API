import { UseCase } from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { RepositoryFactory } from "../../../domain/factory";
import { PropertyRelationshipRepository } from "../../../domain/repository";

export class DeletePropertyRelationshipUseCase
  implements UseCase<{ id: string }, void>
{
  propertyRelationshipRepository: PropertyRelationshipRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
  ) {
    this.logger = WinstonLogger.getInstance();
    this.propertyRelationshipRepository =
      repositoryFactory.createPropertyRelationshipRepository();
  }

  async execute(input: { id: string }): Promise<void> {
    this.logger.info({ message: "Start DeletePropertyRelationship Use Case" });
    await this.propertyRelationshipRepository.delete(input.id);
  }
}
