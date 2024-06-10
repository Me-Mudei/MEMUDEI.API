import { UseCase } from "#shared/app";
import { LoggerInterface, PrismaClient, WinstonLogger } from "#shared/infra";

import {
  UpdateMerchantInput,
  MerchantOutput,
  MerchantOutputMapper,
} from "../dto";

export class UpdateMerchantUseCase
  implements UseCase<UpdateMerchantInput, MerchantOutput>
{
  private logger: LoggerInterface;
  constructor(readonly prisma: PrismaClient) {
    this.logger = WinstonLogger.getInstance();
  }

  async execute(input: UpdateMerchantInput): Promise<MerchantOutput> {
    this.logger.info({ message: "Update Merchant Use Case" });
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
