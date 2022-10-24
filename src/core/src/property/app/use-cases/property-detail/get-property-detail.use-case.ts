import { PropertyDetailRepository, RepositoryFactory } from '../../../domain';
import { Broker } from '../../../../shared/infra/';
import { PropertyDetailOutput, PropertyDetailOutputMapper } from '../../dto';
import { UseCase } from '../../../../shared/app';
import { LoggerInterface } from '../../../../shared/infra/logger/logger.interface';

export class GetPropertyDetailUseCase
  implements UseCase<{ id: string }, PropertyDetailOutput>
{
  propertyDetailRepository: PropertyDetailRepository;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
    readonly logger: LoggerInterface,
  ) {
    this.propertyDetailRepository =
      repositoryFactory.createPropertyDetailRepository();
  }

  async execute(input: { id: string }): Promise<PropertyDetailOutput> {
    this.logger.info({ message: 'Start GetPropertyDetail Use Case' });
    const propertyDetail = await this.propertyDetailRepository.findById(
      input.id,
    );
    return PropertyDetailOutputMapper.toOutput(propertyDetail);
  }
}
