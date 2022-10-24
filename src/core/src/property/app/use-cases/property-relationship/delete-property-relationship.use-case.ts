import { PropertyRelationshipRepository, RepositoryFactory } from '../../../domain';
import { Broker } from '../../../../shared/infra/';
import { UseCase } from '../../../../shared/app';
import { LoggerInterface } from '../../../../shared/infra/logger/logger.interface';

export class DeletePropertyRelationshipUseCase implements UseCase<{ id: string }, void> {
  propertyRelationshipRepository: PropertyRelationshipRepository;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
    readonly logger: LoggerInterface,
  ) {
    this.propertyRelationshipRepository = repositoryFactory.createPropertyRelationshipRepository();
  }

  async execute(input: { id: string }): Promise<void> {
    this.logger.info({ message: 'Start DeletePropertyRelationship Use Case' });
    await this.propertyRelationshipRepository.delete(input.id);
  }
}
