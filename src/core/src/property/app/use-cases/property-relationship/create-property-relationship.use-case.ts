import { PropertyRelationshipRepository } from '../../../domain/repository';
import { RepositoryFactory } from '../../../domain/factory';
import { PropertyRelationship } from '../../../domain/entities';
import { Broker, LoggerInterface, SingletonLogger } from '#shared/infra';
import {
  CreatePropertyRelationshipInput,
  PropertyRelationshipOutput,
  PropertyRelationshipOutputMapper,
} from '../../dto';
import { UseCase } from '#shared/app';

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
    this.logger = SingletonLogger.getInstance();
    this.propertyRelationshipRepository =
      repositoryFactory.createPropertyRelationshipRepository();
  }

  async execute(
    input: CreatePropertyRelationshipInput,
  ): Promise<PropertyRelationshipOutput> {
    this.logger.info({ message: 'Start CreatePropertyRelationship Use Case' });
    const propertyRelationship = new PropertyRelationship({
      name: input.name,
    });
    await this.propertyRelationshipRepository.insert(propertyRelationship);
    return PropertyRelationshipOutputMapper.toOutput(propertyRelationship);
  }
}
