import { NotFoundError, UniqueEntityId } from '../../../../shared/domain';
import {
  PropertyRelationship,
  PropertyRelationshipRepository,
} from '../../../domain';
import { PrismaClient } from '../../../../shared/infra/database';

export class PropertyRelationshipPrismaRepository
  implements PropertyRelationshipRepository
{
  constructor(readonly prisma: PrismaClient) {}
  async findById(id: string | UniqueEntityId): Promise<PropertyRelationship> {
    const propertyRelationship = await this.prisma.property_relationship
      .findFirstOrThrow({
        where: { id: `${id}` },
      })
      .catch((_err) => {
        throw new NotFoundError(
          `Property Relationship Not Found using ID ${id}`,
        );
      });
    return new PropertyRelationship({
      id: new UniqueEntityId(propertyRelationship.id),
      name: propertyRelationship.name,
      description: propertyRelationship.description,
      created_at: propertyRelationship.created_at,
      updated_at: propertyRelationship.updated_at,
    });
  }
}
