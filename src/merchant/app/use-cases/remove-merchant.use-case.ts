import { UseCase } from "#shared/app";
import { LoggerInterface, PrismaClient, WinstonLogger } from "#shared/infra";

import {
  RemoveMerchantInput,
  MerchantOutput,
  MerchantOutputMapper,
} from "../dto";

export class RemoveMerchantUseCase
  implements UseCase<RemoveMerchantInput, MerchantOutput>
{
  private logger: LoggerInterface;
  constructor(readonly prisma: PrismaClient) {
    this.logger = WinstonLogger.getInstance();
  }

  async execute(input: RemoveMerchantInput): Promise<MerchantOutput> {
    this.logger.info({ message: "Remove Merchant Use Case" });
    // const merchant = await this.prisma.merchant.update({
    //   where: {
    //     id: input.id,
    //   },
    //   data: {
    //     example: input.example,
    //   },
    // });
    return MerchantOutputMapper.toOutput({});
  }
}
