import {
  PropertyRelationshipRepository,
  RepositoryFactory,
} from '../../../domain';
import { Broker } from '../../../../shared/infra/';
import {
  PropertyRelationshipOutput,
  PropertyRelationshipOutputMapper,
} from '../../dto';
import { UseCase } from '../../../../shared/app';
import { LoggerInterface } from '../../../../shared/infra/logger/logger.interface';

export class GetPropertyRelationshipUseCase
  implements UseCase<{ id: string }, PropertyRelationshipOutput>
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

  async execute(input: { id: string }): Promise<PropertyRelationshipOutput> {
    this.logger.info({ message: 'Start GetPropertyRelationship Use Case' });
    const propertyRelationship =
      await this.propertyRelationshipRepository.findById(input.id);
    return PropertyRelationshipOutputMapper.toOutput(propertyRelationship);
  }
}
