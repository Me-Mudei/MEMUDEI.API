import { PropertyDetailRepository } from '../../../domain/repository';
import { RepositoryFactory } from '../../../domain/factory';
import { PropertyDetail } from '../../../domain/entities';
import { Broker, LoggerInterface, WinstonLogger } from '#shared/infra';
import {
  UpdatePropertyDetailInput,
  PropertyDetailOutput,
  PropertyDetailOutputMapper,
} from '../../dto';
import { UseCase } from '#shared/app';

export class UpdatePropertyDetailUseCase
  implements UseCase<UpdatePropertyDetailInput, PropertyDetailOutput>
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
    input: UpdatePropertyDetailInput,
  ): Promise<PropertyDetailOutput> {
    this.logger.info({ message: 'Start UpdatePropertyDetail Use Case' });
    const propertyDetail = new PropertyDetail({
      name: input.name,
    });
    await this.propertyDetailRepository.update(propertyDetail);
    return PropertyDetailOutputMapper.toOutput(propertyDetail);
  }
}
