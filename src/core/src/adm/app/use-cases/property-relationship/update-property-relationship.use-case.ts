import { PropertyRelationshipRepository } from '../../../domain/repository';
import { RepositoryFactory } from '../../../domain/factory';
import { PropertyRelationship } from '../../../domain/entities';
import { Broker, LoggerInterface, WinstonLogger } from '#shared/infra';
import {
  UpdatePropertyRelationshipInput,
  PropertyRelationshipOutput,
  PropertyRelationshipOutputMapper,
} from '../../dto';
import { UseCase } from '#shared/app';

export class UpdatePropertyRelationshipUseCase
  implements
    UseCase<UpdatePropertyRelationshipInput, PropertyRelationshipOutput>
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
    input: UpdatePropertyRelationshipInput,
  ): Promise<PropertyRelationshipOutput> {
    this.logger.info({ message: 'Start UpdatePropertyRelationship Use Case' });
    const propertyRelationship = new PropertyRelationship({
      name: input.name,
    });
    await this.propertyRelationshipRepository.update(propertyRelationship);
    return PropertyRelationshipOutputMapper.toOutput(propertyRelationship);
  }
}
