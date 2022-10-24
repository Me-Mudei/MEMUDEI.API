import { PrivacyTypeRepository, RepositoryFactory } from '../../../domain';
import { Broker } from '../../../../shared/infra/';
import { PrivacyTypeOutput, PrivacyTypeOutputMapper } from '../../dto';
import { UseCase } from '../../../../shared/app';
import { LoggerInterface } from '../../../../shared/infra/logger/logger.interface';
import { SearchInputDto } from '../../../../shared/app/dto/search-input.dto';
import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from '../../../../shared/app/dto/pagination-output.dto';

export class SearchPrivacyTypeUseCase
  implements UseCase<SearchInputDto, PaginationOutputDto<PrivacyTypeOutput>>
{
  privacyTypeRepository: PrivacyTypeRepository;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
    readonly logger: LoggerInterface,
  ) {
    this.privacyTypeRepository =
      repositoryFactory.createPrivacyTypeRepository();
  }

  async execute(
    input: SearchInputDto,
  ): Promise<PaginationOutputDto<PrivacyTypeOutput>> {
    this.logger.info({ message: 'Start SearchPrivacyType Use Case' });
    const params = new PrivacyTypeRepository.SearchParams(input);
    const privacyType = await this.privacyTypeRepository.search(params);
    const items = privacyType.items.map((privacyType) =>
      PrivacyTypeOutputMapper.toOutput(privacyType),
    );

    return PaginationOutputMapper.toOutput(items, privacyType);
  }
}
