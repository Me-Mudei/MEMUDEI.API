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

export class UpdatePropertyRelationshipUseCase
  implements UseCase<UpdatePropertyRelationshipInput, PropertyRelationshipOutput>
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

  async execute(input: UpdatePropertyRelationshipInput): Promise<PropertyRelationshipOutput> {
    this.logger.info({ message: 'Start UpdatePropertyRelationship Use Case' });
    const propertyRelationship = new PropertyRelationship({
      name: input.name,
    });
    await this.propertyRelationshipRepository.update(propertyRelationship);
    return PropertyRelationshipOutputMapper.toOutput(propertyRelationship);
  }
}
