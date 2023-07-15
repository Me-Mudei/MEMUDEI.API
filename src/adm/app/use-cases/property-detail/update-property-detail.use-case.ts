import { UseCase } from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { PropertyDetail } from "../../../domain/entities";
import { RepositoryFactory } from "../../../domain/factory";
import { PropertyDetailRepository } from "../../../domain/repository";
import {
  UpdatePropertyDetailInput,
  PropertyDetailOutput,
  PropertyDetailOutputMapper
} from "../../dto";

export class UpdatePropertyDetailUseCase
  implements UseCase<UpdatePropertyDetailInput, PropertyDetailOutput>
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
    input: UpdatePropertyDetailInput
  ): Promise<PropertyDetailOutput> {
    this.logger.info({ message: "Start UpdatePropertyDetail Use Case" });
    const propertyDetail = new PropertyDetail({
      key: input.key,
      name: input.name,
      description: input.description
    });
    await this.propertyDetailRepository.update(propertyDetail);
    return PropertyDetailOutputMapper.toOutput(propertyDetail);
  }
}
