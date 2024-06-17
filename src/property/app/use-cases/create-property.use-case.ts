import { PropertyCreated } from "#property/domain";
import { UseCase } from "#shared/app";
import { UniqueEntityId } from "#shared/domain";
import {
  Broker,
  LoggerInterface,
  PrismaClient,
  WinstonLogger,
} from "#shared/infra";

import { Property, PropertyStatus, PropertyType } from "../../domain/entities";
import {
  CreatePropertyInput,
  PropertyOutput,
  PropertyOutputMapper,
} from "../dto";

export class CreatePropertyUseCase
  implements UseCase<CreatePropertyInput, PropertyOutput>
{
  private logger: LoggerInterface;
  constructor(
    readonly prisma: PrismaClient,
    readonly broker: Broker,
  ) {
    this.logger = WinstonLogger.getInstance();
  }

  async execute(input: CreatePropertyInput): Promise<PropertyOutput> {
    this.logger.info({ message: "Start Property Use Case" });
    let media = [];
    if (input.media && input.media.length > 0) {
      media = await Promise.all(
        input.media.map(async (media) => {
          const file = await this.prisma.file.create({
            data: {
              external_id: media.file.external_id,
              url: media.file.url,
              name: media.file.name,
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
    const createdProperty = await this.prisma.property.create({
      data: {
        title: input.title,
        description: input.description,
        status: input.status,
        property_type: input.property_type,
        merchant: {
          connect: {
            id: input.merchant_id,
          },
        },
        created_by: {
          connect: {
            merchant_id_user_id: {
              merchant_id: input.merchant_id,
              user_id: input.created_by_id,
            },
          },
        },
        address: {
          create: {
            zip_code: input.address.zip_code,
            city: input.address.city,
            state: input.address.state,
            street: input.address.street,
            country: input.address.country,
            location: {
              create: {
                lat: input.address.location.lat,
                lng: input.address.location.lng,
              },
            },
            district: input.address.district,
            complement: input.address.complement,
          },
        },
        details: {
          createMany: {
            data: input.details.map((detail) => ({
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
          createMany: {
            data: media,
            skipDuplicates: true,
          },
        },
      },
    });
    const property = new Property({
      id: new UniqueEntityId(createdProperty.id),
      title: createdProperty.title,
      description: createdProperty.description,
      status: PropertyStatus[createdProperty.status],
      property_type: PropertyType[createdProperty.property_type],
      created_at: createdProperty.created_at,
      updated_at: createdProperty.updated_at,
    });
    await this.broker.publish(new PropertyCreated(property));
    return PropertyOutputMapper.toOutput(property);
  }
}
