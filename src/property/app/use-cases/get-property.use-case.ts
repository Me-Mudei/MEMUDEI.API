import { Property, PropertyStatus, PropertyType } from "#property/domain";
import { UseCase } from "#shared/app";
import { UniqueEntityId } from "#shared/domain";
import { LoggerInterface, PrismaClient, WinstonLogger } from "#shared/infra";

import { PropertyOutput, PropertyOutputMapper } from "../dto";

export class GetPropertyUseCase
  implements UseCase<{ id: string }, PropertyOutput>
{
  private logger: LoggerInterface;
  constructor(readonly prisma: PrismaClient) {
    this.logger = WinstonLogger.getInstance();
  }

  async execute(input: { id: string }): Promise<PropertyOutput> {
    this.logger.info({ message: "Start Property Use Case" });
    const foundProperty = await this.prisma.property.findFirst({
      where: { id: input.id },
    });
    if (!foundProperty) {
      throw new Error("Property not found");
    }
    const property = new Property({
      id: new UniqueEntityId(foundProperty.id),
      title: foundProperty.title,
      description: foundProperty.description,
      status: PropertyStatus[foundProperty.status],
      property_type: PropertyType[foundProperty.property_type],
      created_at: foundProperty.created_at,
      updated_at: foundProperty.updated_at,
    });
    return PropertyOutputMapper.toOutput(property);
  }
}
