import { UseCase } from "#shared/app";
import { LoggerInterface, PrismaClient, WinstonLogger } from "#shared/infra";

import { AuthorizeInput } from "../dto";

export class AuthorizeUseCase implements UseCase<AuthorizeInput, boolean> {
  private logger: LoggerInterface;
  constructor(readonly prisma: PrismaClient) {
    this.logger = WinstonLogger.getInstance();
  }

  async execute(input: AuthorizeInput): Promise<boolean> {
    this.logger.info({ message: "Start User Use Case" });
    const user = await this.prisma.user.findFirst({
      where: {
        id: input.user_id,
        OR: [
          {
            global_role: {
              name: { in: input.global_roles },
            },
          },
          {
            members: {
              some: {
                merchant_id: input.merchant_id,
                org_role: {
                  name: { in: input.org_roles },
                },
              },
            },
          },
        ],
      },
    });
    return !!user;
  }
}
