import { NotFoundError, UniqueEntityId } from '../../../../shared/domain';
import { PropertyDetail, PropertyDetailRepository } from '../../../domain';
import { PrismaClient } from '../../../../shared/infra/database';

export class PropertyDetailPrismaRepository
  implements PropertyDetailRepository
{
  constructor(readonly prisma: PrismaClient) {}

  async findManyByIds(
    ids: string[] | UniqueEntityId[],
  ): Promise<PropertyDetail[]> {
    const propertyDetailsDatabase = await this.prisma.property_detail.findMany({
      where: {
        id: {
          in: ids.map((id) => `${id}`),
        },
      },
    });
    ids.map((id) => {
      if (!propertyDetailsDatabase.find((c) => c.id === `${id}`)) {
        throw new NotFoundError(`Property Detail Not Found using ID ${id}`);
      }
    });
    const propertyDetails = propertyDetailsDatabase.map(
      (propertyDetail) =>
        new PropertyDetail({
          id: new UniqueEntityId(propertyDetail.id),
          name: propertyDetail.name,
          description: propertyDetail.description,
          created_at: propertyDetail.created_at,
          updated_at: propertyDetail.updated_at,
        }),
    );
    return propertyDetails;
  }
}
