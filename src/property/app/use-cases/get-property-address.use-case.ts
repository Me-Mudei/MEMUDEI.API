import { Address, Location } from "#property/domain";
import { UseCase } from "#shared/app";
import { UniqueEntityId } from "#shared/domain";
import { LoggerInterface, PrismaClient, WinstonLogger } from "#shared/infra";

import { AddressOutput, AddressOutputMapper } from "../dto";

export class GetPropertyAddressUseCase
  implements UseCase<{ property_id: string }, AddressOutput>
{
  private logger: LoggerInterface;
  constructor(readonly prisma: PrismaClient) {
    this.logger = WinstonLogger.getInstance();
  }

  async execute(input: { property_id: string }): Promise<AddressOutput> {
    this.logger.info({ message: "Start Property Use Case" });
    const foundAddress = await this.prisma.address.findFirst({
      where: {
        property: { id: input.property_id },
      },
      include: {
        location: {
          select: {
            lat: true,
            lng: true,
          },
        },
      },
    });
    const location = new Location({
      lat: foundAddress.location.lat,
      lng: foundAddress.location.lng,
    });
    const address = new Address({
      id: new UniqueEntityId(foundAddress.id),
      zip_code: foundAddress.zip_code,
      city: foundAddress.city,
      state: foundAddress.state,
      street: foundAddress.street,
      country: foundAddress.country,
      district: foundAddress.district,
      complement: foundAddress.complement,
      created_at: foundAddress.created_at,
      updated_at: foundAddress.updated_at,
      location,
    });
    return AddressOutputMapper.toOutput(address);
  }
}
