import { SearchInputDto, UseCase } from "#shared/app";
import {
  LoggerInterface,
  Prisma,
  PrismaClient,
  WinstonLogger,
} from "#shared/infra";

import { UserFilter, UserSearchParams } from "../../domain";
import { UserOutput, UserOutputMapper } from "../dto";

export class FindFirstUserUseCase
  implements UseCase<SearchInputDto<UserFilter>, UserOutput>
{
  private logger: LoggerInterface;
  constructor(readonly prisma: PrismaClient) {
    this.logger = WinstonLogger.getInstance();
  }

  async execute(input: SearchInputDto<UserFilter>): Promise<UserOutput> {
    this.logger.info({ message: "Start User Use Case" });
    const params = new UserSearchParams(input);
    const user = await this.prisma.user.findFirst(
      params.toPrismaPagination<Prisma.UserFindFirstArgs>(),
    );
    if (!user) {
      throw new Error("User not found");
    }
    return UserOutputMapper.toOutput(user);
  }
}
