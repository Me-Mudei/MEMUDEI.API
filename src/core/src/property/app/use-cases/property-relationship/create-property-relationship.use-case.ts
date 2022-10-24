import {
  PropertyRelationship,
  PropertyRelationshipRepository,
  RepositoryFactory,
} from '../../../domain';
import { Broker } from '../../../../shared/infra/';
import {
  CreatePropertyRelationshipInput,
  PropertyRelationshipOutput,
  PropertyRelationshipOutputMapper,
} from '../../dto';
import { UseCase } from '../../../../shared/app';
import { LoggerInterface } from '../../../../shared/infra/logger/logger.interface';

export class CreatePropertyRelationshipUseCase
  implements UseCase<CreatePropertyRelationshipInput, PropertyRelationshipOutput>
{
  propertyRelationshipRepository: PropertyRelationshipRepository;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
    readonly logger: LoggerInterface,
  ) {
    this.propertyRelationshipRepository =
      repositoryFactory.createPropertyRelationshipRepository();
  }

  async execute(input: CreatePropertyRelationshipInput): Promise<PropertyRelationshipOutput> {
    this.logger.info({ message: 'Start CreatePropertyRelationship Use Case' });
    const propertyRelationship = new PropertyRelationship({
      name: input.name,
    });
    await this.propertyRelationshipRepository.insert(propertyRelationship);
    return PropertyRelationshipOutputMapper.toOutput(propertyRelationship);
  }
}
