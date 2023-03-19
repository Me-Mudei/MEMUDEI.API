import { PropertyDetailRepository } from '../../../domain/repository';
import { RepositoryFactory } from '../../../domain/factory';
import { Broker, LoggerInterface, WinstonLogger } from '#shared/infra';
import { PropertyDetailOutput, PropertyDetailOutputMapper } from '../../dto';
import { UseCase } from '#shared/app';

export class GetPropertyDetailUseCase
  implements UseCase<{ id: string }, PropertyDetailOutput>
{
  propertyDetailRepository: PropertyDetailRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
  ) {
    this.logger = WinstonLogger.getInstance();
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
