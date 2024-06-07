import { UseCase } from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { PropertyRelationship } from "../../../domain/entities";
import { RepositoryFactory } from "../../../domain/factory";
import { PropertyRelationshipRepository } from "../../../domain/repository";
import {
  CreatePropertyRelationshipInput,
  PropertyRelationshipOutput,
  PropertyRelationshipOutputMapper,
} from "../../dto";

export class CreatePropertyRelationshipUseCase
  implements
    UseCase<CreatePropertyRelationshipInput, PropertyRelationshipOutput>
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

  async execute(
    input: CreatePropertyRelationshipInput,
  ): Promise<PropertyRelationshipOutput> {
    this.logger.info({ message: "Start CreatePropertyRelationship Use Case" });
    const propertyRelationship = new PropertyRelationship({
      key: input.key,
      name: input.name,
      description: input.description,
    });
    await this.propertyRelationshipRepository.insert(propertyRelationship);
    return PropertyRelationshipOutputMapper.toOutput(propertyRelationship);
  }
}
