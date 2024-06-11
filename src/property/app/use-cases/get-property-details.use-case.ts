import { Detail, DetailType } from "#property/domain";
import { UseCase } from "#shared/app";
import { UniqueEntityId } from "#shared/domain";
import { LoggerInterface, PrismaClient, WinstonLogger } from "#shared/infra";

import { DetailOutput, DetailOutputMapper } from "../dto";

export class GetPropertyDetailsUseCase
  implements UseCase<{ property_id: string }, DetailOutput[]>
{
  private logger: LoggerInterface;
  constructor(readonly prisma: PrismaClient) {
    this.logger = WinstonLogger.getInstance();
  }

  async execute(input: { property_id: string }): Promise<DetailOutput[]> {
    this.logger.info({ message: "Start Property Use Case" });
    const foundDetails = await this.prisma.detail.findMany({
      where: { property_id: input.property_id },
    });
    const details = foundDetails.map((detail) => {
      return new Detail({
        id: new UniqueEntityId(detail.id),
        type: DetailType[detail.type],
        key: detail.key,
        value: detail.value,
        unit: detail.unit,
        available: detail.available,
        created_at: detail.created_at,
        updated_at: detail.updated_at,
      });
    });
    return details.map(DetailOutputMapper.toOutput);
  }
}
