import { UseCase } from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { RepositoryFactory } from "../../../domain/factory";
import { PropertyRelationshipRepository } from "../../../domain/repository";
import {
  PropertyRelationshipOutput,
  PropertyRelationshipOutputMapper
} from "../../dto";

export class GetPropertyRelationshipUseCase
  implements UseCase<{ id: string }, PropertyRelationshipOutput>
{
  propertyRelationshipRepository: PropertyRelationshipRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker
  ) {
    this.logger = WinstonLogger.getInstance();
    this.propertyRelationshipRepository =
      repositoryFactory.createPropertyRelationshipRepository();
  }

  async execute(input: { id: string }): Promise<PropertyRelationshipOutput> {
    this.logger.info({ message: "Start GetPropertyRelationship Use Case" });
    const propertyRelationship =
      await this.propertyRelationshipRepository.findById(input.id);
    return PropertyRelationshipOutputMapper.toOutput(propertyRelationship);
  }
}
