import { Property, PropertyStatus, PropertyType } from "#property/domain";
import { UseCase } from "#shared/app";
import { UniqueEntityId } from "#shared/domain";
import { LoggerInterface, PrismaClient, WinstonLogger } from "#shared/infra";

import {
  UpdatePropertyInput,
  PropertyOutput,
  PropertyOutputMapper,
} from "../dto";

export class UpdatePropertyUseCase
  implements UseCase<UpdatePropertyInput, PropertyOutput>
{
  private logger: LoggerInterface;
  constructor(readonly prisma: PrismaClient) {
    this.logger = WinstonLogger.getInstance();
  }

  async execute(input: UpdatePropertyInput): Promise<PropertyOutput> {
    this.logger.info({ message: "Start Property Use Case" });
    const updatedProperty = await this.prisma.property.update({
      where: { id: input.id },
      data: {
        title: input.title,
        description: input.description,
        status: input.status,
        address: {
          update: {
            city: input?.address?.city,
            complement: input?.address?.complement,
            country: input?.address?.country,
            district: input?.address?.district,
            state: input?.address?.state,
            street: input?.address?.street,
            zip_code: input?.address?.zip_code,
            location: {
              update: {
                lat: input?.address?.location?.lat,
                lng: input?.address?.location?.lng,
              },
            },
          },
        },
        property_type: input.property_type,
        details: {
          deleteMany: input.details?.remove && {
            key: { in: input.details.remove },
          },
          createMany: input.details?.insert && {
            data: input.details.insert.map((detail) => ({
              key: detail.key,
              type: detail.type,
              available: detail.available,
              value: detail.value,
              unit: detail.unit,
            })),
            skipDuplicates: true,
          },
        },
        media: {
          deleteMany: input.media?.remove && {
            id: { in: input.media.remove },
          },
          createMany: input.media?.insert && {
            data: input.media.insert.map((file) => ({
              url: file.url,
              external_id: file.external_id,
              filename: file.filename,
              type: file.type,
              subtype: file.subtype,
              position: file.position,
              description: file.description,
              property_id: input.id,
            })),
            skipDuplicates: true,
          },
        },
      },
    });
    if (input.details?.update) {
      for (const detail of input.details.update) {
        await this.prisma.detail.update({
          where: {
            property_id_key: {
              property_id: input.id,
              key: detail.key,
            },
          },
          data: {
            available: detail.available,
            value: detail.value,
            unit: detail.unit,
          },
        });
      }
    }
    if (input.media?.update) {
      for (const file of input.media.update) {
        await this.prisma.file.update({
          where: {
            id: file.id,
          },
          data: {
            position: file.position,
            description: file.description,
          },
        });
      }
    }
    const property = new Property({
      id: new UniqueEntityId(updatedProperty.id),
      title: updatedProperty.title,
      description: updatedProperty.description,
      status: PropertyStatus[updatedProperty.status],
      property_type: PropertyType[updatedProperty.property_type],
      created_at: updatedProperty.created_at,
      updated_at: updatedProperty.updated_at,
    });
    return PropertyOutputMapper.toOutput(property);
  }
}
