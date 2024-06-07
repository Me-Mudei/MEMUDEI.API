import { UseCase } from "#shared/app";
import { LoggerInterface, PrismaClient, WinstonLogger } from "#shared/infra";

import { AuthUserOutput, AuthUserOutputMapper, ValidateInput } from "../dto";

export class ValidateUseCase implements UseCase<ValidateInput, AuthUserOutput> {
  private logger: LoggerInterface;
  constructor(readonly prisma: PrismaClient) {
    this.logger = WinstonLogger.getInstance();
  }

  async execute(input: ValidateInput): Promise<AuthUserOutput> {
    this.logger.info({ message: "Start User Use Case" });
    const user = await this.prisma.user.findUnique({
      where: { id: input.sub },
    });
    return AuthUserOutputMapper.toOutput(user);
  }
}
