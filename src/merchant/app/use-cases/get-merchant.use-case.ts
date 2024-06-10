import { UseCase } from "#shared/app";
import { LoggerInterface, PrismaClient, WinstonLogger } from "#shared/infra";

import {
  GetMerchantInput,
  MerchantOutput,
  MerchantOutputMapper,
} from "../dto";

export class GetMerchantUseCase
  implements UseCase<GetMerchantInput, MerchantOutput>
{
  private logger: LoggerInterface;
  constructor(readonly prisma: PrismaClient) {
    this.logger = WinstonLogger.getInstance();
  }

  async execute(input: GetMerchantInput): Promise<MerchantOutput> {
    this.logger.info({ message: "Get Merchant Use Case" });
    const merchant = await this.prisma.merchant.findFirst({
      where: {
        id: input.id,
      },
    });
    return MerchantOutputMapper.toOutput(merchant);
  }
}
