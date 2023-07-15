import { UseCase } from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { RepositoryFactory } from "../../../domain/factory";
import { PropertyDetailRepository } from "../../../domain/repository";

export class DeletePropertyDetailUseCase
  implements UseCase<{ id: string }, void>
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

  async execute(input: { id: string }): Promise<void> {
    this.logger.info({ message: "Start DeletePropertyDetail Use Case" });
    await this.propertyDetailRepository.delete(input.id);
  }
}
