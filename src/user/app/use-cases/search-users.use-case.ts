import {
  PaginationOutputDto,
  PaginationOutputMapper,
  SearchInputDto,
  UseCase,
} from "#shared/app";
import { UniqueEntityId } from "#shared/domain";
import {
  LoggerInterface,
  Prisma,
  PrismaClient,
  WinstonLogger,
} from "#shared/infra";
import {
  User,
  UserFilter,
  UserSearchParams,
  UserSearchResult,
} from "#user/domain";

import { UserOutput, UserOutputMapper } from "../dto";

export class SearchUsersUseCase
  implements
    UseCase<SearchInputDto<UserFilter>, PaginationOutputDto<UserOutput>>
{
  private logger: LoggerInterface;
  constructor(readonly prisma: PrismaClient) {
    this.logger = WinstonLogger.getInstance();
  }

  async execute(
    input: SearchInputDto<UserFilter>,
  ): Promise<PaginationOutputDto<UserOutput>> {
    this.logger.info({ message: "Start User Use Case" });
    const params = new UserSearchParams(input);
    const users = await this.prisma.user.findMany(
      params.toPrismaPagination<Prisma.UserFindManyArgs>(),
    );
    const result = new UserSearchResult({
      items: users.map(
        (user) =>
          new User({
            id: new UniqueEntityId(user.id),
            name: user.name,
            email: user.email,
            created_at: new Date(user.created_at),
            updated_at: new Date(user.updated_at),
          }),
      ),
      current_page: input.page,
      per_page: input.per_page,
      total: users.length,
      filter: input.filter,
      sort: input.sort,
      sort_dir: input.sort_dir,
    });
    const items = result.items.map((user) => UserOutputMapper.toOutput(user));
    return PaginationOutputMapper.toOutput(items, result);
  }
}
