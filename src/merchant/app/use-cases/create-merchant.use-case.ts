import { UseCase } from "#shared/app";
import { LoggerInterface, PrismaClient, WinstonLogger } from "#shared/infra";

import {
  CreateMerchantInput,
  MerchantOutput,
  MerchantOutputMapper,
} from "../dto";

export class CreateMerchantUseCase
  implements UseCase<CreateMerchantInput, MerchantOutput>
{
  private logger: LoggerInterface;
  constructor(readonly prisma: PrismaClient) {
    this.logger = WinstonLogger.getInstance();
  }

  async execute(input: CreateMerchantInput): Promise<MerchantOutput> {
    this.logger.info({ message: "Create Merchant Use Case" });
    // const merchant = await this.prisma.merchant.create({
    //   data: {
    //     example: input.example,
    //   },
    // });
    return MerchantOutputMapper.toOutput({});
  }
}
