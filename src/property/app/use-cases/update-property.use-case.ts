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
    let media = [];
    if (input.media.insert && input.media.insert.length > 0) {
      media = await Promise.all(
        input.media.insert.map(async (media) => {
          const file = await this.prisma.file.create({
            data: {
              external_id: media.file.external_id,
              url: media.file.url,
              filename: media.file.filename,
              type: media.file.type,
              subtype: media.file.subtype,
            },
          });
          return {
            file_id: file.id,
            position: media.position,
            description: media.description,
          };
        }),
      );
    }
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
            file_id: { in: input.media.remove },
            property_id: input.id,
          },
          createMany: input.media?.insert && {
            data: media,
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
      for (const media of input.media.update) {
        await this.prisma.propertyMedia.update({
          where: {
            file_id_property_id: {
              file_id: media.file_id,
              property_id: input.id,
            },
          },
          data: {
            position: media.position,
            description: media.description,
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
