import { PropertyDetailRepository } from '../../../domain/repository';
import { RepositoryFactory } from '../../../domain/factory';
import { PropertyDetail } from '../../../domain/entities';
import { Broker, LoggerInterface, WinstonLogger } from '#shared/infra';
import {
  CreatePropertyDetailInput,
  PropertyDetailOutput,
  PropertyDetailOutputMapper,
} from '../../dto';
import { UseCase } from '#shared/app';

export class CreatePropertyDetailUseCase
  implements UseCase<CreatePropertyDetailInput, PropertyDetailOutput>
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

  async execute(
    input: CreatePropertyDetailInput,
  ): Promise<PropertyDetailOutput> {
    this.logger.info({ message: 'Start CreatePropertyDetail Use Case' });
    const propertyDetail = new PropertyDetail({
      name: input.name,
    });
    await this.propertyDetailRepository.insert(propertyDetail);
    return PropertyDetailOutputMapper.toOutput(propertyDetail);
  }
}
