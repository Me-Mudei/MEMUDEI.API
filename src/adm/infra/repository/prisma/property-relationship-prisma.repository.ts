import { NotFoundError, UniqueEntityId } from "#shared/domain";
import { PrismaClient } from "#shared/infra";

import {
  PropertyRelationship,
  PropertyRelationshipRepository,
  PropertyRelationshipSearchParams,
  PropertyRelationshipSearchResult
} from "../../../domain";

export class PropertyRelationshipPrismaRepository
  implements PropertyRelationshipRepository
{
  sortableFields: string[] = ["createdAt"];
  constructor(readonly prisma: PrismaClient) {}

  async insert(entity: PropertyRelationship): Promise<void> {
    await this.prisma.property_relationship.create({
      data: {
        id: entity.id,
        key: entity.key,
        name: entity.name,
        description: entity.description,
        created_at: entity.created_at,
        updated_at: entity.updated_at
      }
    });
  }

  async findById(id: string | UniqueEntityId): Promise<PropertyRelationship> {
    const propertyRelationship = await this.prisma.property_relationship
      .findFirstOrThrow({
        where: { id: id.toString() }
      })
      .catch((_err) => {
        throw new NotFoundError(`Entity Not Found using ID ${id}`);
      });

    return this.toEntity(propertyRelationship);
  }

  async findManyById(
    ids: (string | UniqueEntityId)[]
  ): Promise<PropertyRelationship[]> {
    const propertyRelationships =
      await this.prisma.property_relationship.findMany({
        where: {
          id: {
            in: ids.map((id) => id.toString())
          }
        }
      });
    return propertyRelationships.map((propertyRelationship) =>
      this.toEntity(propertyRelationship)
    );
  }

  async findAll(): Promise<PropertyRelationship[]> {
    const propertyRelationships =
      await this.prisma.property_relationship.findMany();
    return propertyRelationships.map((propertyRelationship) =>
      this.toEntity(propertyRelationship)
    );
  }

  async update(entity: PropertyRelationship): Promise<void> {
    await this.prisma.property_relationship.update({
      where: { id: entity.id },
      data: {
        key: entity.key,
        name: entity.name,
        description: entity.description
      }
    });
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    await this.prisma.property_relationship.delete({
      where: { id: id.toString() }
    });
  }

  async search(
    props: PropertyRelationshipSearchParams
  ): Promise<PropertyRelationshipSearchResult> {
    const offset = (props.page - 1) * props.per_page;
    const limit = props.per_page;

    const propertyRelationships =
      await this.prisma.property_relationship.findMany({
        take: limit,
        skip: offset,
        orderBy: {
          ...(props.sort && this.sortableFields.includes(props.sort)
            ? { [props.sort]: props.sort_dir }
            : { created_at: "asc" })
        }
      });
    return new PropertyRelationshipSearchResult({
      items: propertyRelationships.map((propertyRelationship) =>
        this.toEntity(propertyRelationship)
      ),
      current_page: props.page,
      per_page: props.per_page,
      total: propertyRelationships.length,
      filter: props.filter,
      sort: props.sort,
      sort_dir: props.sort_dir
    });
  }

  private toEntity(entity: any): PropertyRelationship {
    return new PropertyRelationship({
      id: new UniqueEntityId(entity.id),
      key: entity.key,
      name: entity.name,
      description: entity.description,
      created_at: entity.created_at,
      updated_at: entity.updated_at
    });
  }
}
