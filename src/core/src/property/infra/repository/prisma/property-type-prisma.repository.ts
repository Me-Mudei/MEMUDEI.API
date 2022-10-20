import { NotFoundError, UniqueEntityId } from '../../../../shared/domain';
import { PropertyType, PropertyTypeRepository } from '../../../domain';
import { PrismaClient } from '../../../../shared/infra/database';

export class PropertyTypePrismaRepository implements PropertyTypeRepository {
  constructor(readonly prisma: PrismaClient) {}
  async findById(id: string | UniqueEntityId): Promise<PropertyType> {
    const propertyType = await this.prisma.property_type
      .findFirstOrThrow({
        where: { id: `${id}` },
      })
      .catch((_err) => {
        throw new NotFoundError(`Property Type Not Found using ID ${id}`);
      });
    return new PropertyType({
      id: new UniqueEntityId(propertyType.id),
      name: propertyType.name,
      description: propertyType.description,
      created_at: propertyType.created_at,
      updated_at: propertyType.updated_at,
    });
  }
}
