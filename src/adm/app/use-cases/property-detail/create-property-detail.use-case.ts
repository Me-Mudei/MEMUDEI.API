import { UseCase } from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { PropertyDetail } from "../../../domain/entities";
import { RepositoryFactory } from "../../../domain/factory";
import { PropertyDetailRepository } from "../../../domain/repository";
import {
  CreatePropertyDetailInput,
  PropertyDetailOutput,
  PropertyDetailOutputMapper
} from "../../dto";

export class CreatePropertyDetailUseCase
  implements UseCase<CreatePropertyDetailInput, PropertyDetailOutput>
{
  propertyDetailRepository: PropertyDetailRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker
  ) {
    this.logger = WinstonLogger.getInstance();
    this.propertyDetailRepository =
      repositoryFactory.createPropertyDetailRepository();
  }

  async execute(
    input: CreatePropertyDetailInput
  ): Promise<PropertyDetailOutput> {
    this.logger.info({ message: "Start CreatePropertyDetail Use Case" });
    const propertyDetail = new PropertyDetail({
      key: input.key,
      name: input.name,
      description: input.description
    });
    await this.propertyDetailRepository.insert(propertyDetail);
    return PropertyDetailOutputMapper.toOutput(propertyDetail);
  }
}
