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
import { SearchInputDto } from '../../../../shared/app/dto/search-input.dto';
import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from '../../../../shared/app/dto/pagination-output.dto';

export class SearchPropertyRelationshipUseCase
  implements
    UseCase<SearchInputDto, PaginationOutputDto<PropertyRelationshipOutput>>
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

  async execute(
    input: SearchInputDto,
  ): Promise<PaginationOutputDto<PropertyRelationshipOutput>> {
    this.logger.info({ message: 'Start SearchPropertyRelationship Use Case' });
    const params = new PropertyRelationshipRepository.SearchParams(input);
    const propertyRelationship =
      await this.propertyRelationshipRepository.search(params);
    const items = propertyRelationship.items.map((propertyRelationship) =>
      PropertyRelationshipOutputMapper.toOutput(propertyRelationship),
    );

    return PaginationOutputMapper.toOutput(items, propertyRelationship);
  }
}
