import {
  PaginationOutputDto,
  PaginationOutputMapper,
  SearchInputDto,
  UseCase,
} from '#shared/app';
import { LoggerInterface, WinstonLogger } from '#shared/infra';
import { UserFilter, UserRepository, UserSearchParams } from '../../domain';
import { UserOutput, UserOutputMapper } from '../dto';

export class SearchUsersUseCase
  implements
    UseCase<SearchInputDto<UserFilter>, PaginationOutputDto<UserOutput>>
{
  private logger: LoggerInterface;
  constructor(readonly userRepository: UserRepository) {
    this.logger = WinstonLogger.getInstance();
  }

  async execute(
    input: SearchInputDto<UserFilter>,
  ): Promise<PaginationOutputDto<UserOutput>> {
    this.logger.info({ message: 'Start User Use Case' });
    const params = new UserSearchParams(input);
    const result = await this.userRepository.search(params);
    const items = result.items.map((user) => UserOutputMapper.toOutput(user));

    return PaginationOutputMapper.toOutput(items, result);
  }
}
