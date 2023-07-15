import { UseCase } from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { PropertyType } from "../../../domain/entities";
import { RepositoryFactory } from "../../../domain/factory";
import { PropertyTypeRepository } from "../../../domain/repository";
import {
  CreatePropertyTypeInput,
  PropertyTypeOutput,
  PropertyTypeOutputMapper
} from "../../dto";

export class CreatePropertyTypeUseCase
  implements UseCase<CreatePropertyTypeInput, PropertyTypeOutput>
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

  async execute(input: CreatePropertyTypeInput): Promise<PropertyTypeOutput> {
    this.logger.info({ message: "Start CreatePropertyType Use Case" });
    const propertyType = new PropertyType({
      key: input.key,
      name: input.name,
      description: input.description
    });
    await this.propertyTypeRepository.insert(propertyType);
    return PropertyTypeOutputMapper.toOutput(propertyType);
  }
}
