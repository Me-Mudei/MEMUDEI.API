import { PropertyRelationshipRepository } from '../../../domain/repository';
import { RepositoryFactory } from '../../../domain/factory';
import { Broker, LoggerInterface, SingletonLogger } from '#shared/infra';
import {
  PropertyRelationshipOutput,
  PropertyRelationshipOutputMapper,
} from '../../dto';
import { UseCase } from '#shared/app';

export class GetPropertyRelationshipUseCase
  implements UseCase<{ id: string }, PropertyRelationshipOutput>
{
  propertyRelationshipRepository: PropertyRelationshipRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
  ) {
    this.logger = SingletonLogger.getInstance();
    this.propertyRelationshipRepository =
      repositoryFactory.createPropertyRelationshipRepository();
  }

  async execute(input: { id: string }): Promise<PropertyRelationshipOutput> {
    this.logger.info({ message: 'Start GetPropertyRelationship Use Case' });
    const propertyRelationship =
      await this.propertyRelationshipRepository.findById(input.id);
    return PropertyRelationshipOutputMapper.toOutput(propertyRelationship);
  }
}
