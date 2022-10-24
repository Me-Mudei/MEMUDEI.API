import {
  PropertyDetail,
  PropertyDetailRepository,
  RepositoryFactory,
} from '../../../domain';
import { Broker } from '../../../../shared/infra/';
import {
  CreatePropertyDetailInput,
  PropertyDetailOutput,
  PropertyDetailOutputMapper,
} from '../../dto';
import { UseCase } from '../../../../shared/app';
import { LoggerInterface } from '../../../../shared/infra/logger/logger.interface';

export class UpdatePropertyDetailUseCase
  implements UseCase<UpdatePropertyDetailInput, PropertyDetailOutput>
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

  async execute(input: UpdatePropertyDetailInput): Promise<PropertyDetailOutput> {
    this.logger.info({ message: 'Start UpdatePropertyDetail Use Case' });
    const propertyDetail = new PropertyDetail({
      name: input.name,
    });
    await this.propertyDetailRepository.update(propertyDetail);
    return PropertyDetailOutputMapper.toOutput(propertyDetail);
  }
}
