import { NotFoundError, UniqueEntityId } from '#shared/domain';
import {
  PropertyType,
  PropertyTypeRepository,
  PropertyTypeSearchParams,
  PropertyTypeSearchResult,
} from '../../../domain';
import { PrismaClient } from '#shared/infra';

export class PropertyTypePrismaRepository implements PropertyTypeRepository {
  sortableFields: string[] = ['createdAt'];
  constructor(readonly prisma: PrismaClient) {}

  async insert(entity: PropertyType): Promise<void> {
    await this.prisma.property_type.create({
      data: {
        id: entity.id,
        key: entity.key,
        name: entity.name,
        description: entity.description,
        created_at: entity.created_at,
        updated_at: entity.updated_at,
      },
    });
  }

  async findById(id: string | UniqueEntityId): Promise<PropertyType> {
    const propertyType = await this.prisma.property_type
      .findFirstOrThrow({
        where: { id: id.toString() },
      })
      .catch((_err) => {
        throw new NotFoundError(`Entity Not Found using ID ${id}`);
      });

    return this.toEntity(propertyType);
  }

  async findManyById(
    ids: (string | UniqueEntityId)[],
  ): Promise<PropertyType[]> {
    const propertyTypes = await this.prisma.property_type.findMany({
      where: {
        id: {
          in: ids.map((id) => id.toString()),
        },
      },
    });
    return propertyTypes.map((propertyType) => this.toEntity(propertyType));
  }

  async findAll(): Promise<PropertyType[]> {
    const propertyTypes = await this.prisma.property_type.findMany();
    return propertyTypes.map((propertyType) => this.toEntity(propertyType));
  }

  async update(entity: PropertyType): Promise<void> {
    await this.prisma.property_type.update({
      where: { id: entity.id },
      data: {
        key: entity.key,
        name: entity.name,
        description: entity.description,
      },
    });
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    await this.prisma.property_type.delete({
      where: { id: id.toString() },
    });
  }

  async search(
    props: PropertyTypeSearchParams,
  ): Promise<PropertyTypeSearchResult> {
    const offset = (props.page - 1) * props.per_page;
    const limit = props.per_page;

    const propertyTypes = await this.prisma.property_type.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        ...(props.sort && this.sortableFields.includes(props.sort)
          ? { [props.sort]: props.sort_dir }
          : { created_at: 'asc' }),
      },
    });
    return new PropertyTypeSearchResult({
      items: propertyTypes.map((propertyType) => this.toEntity(propertyType)),
      current_page: props.page,
      per_page: props.per_page,
      total: propertyTypes.length,
      filter: props.filter,
      sort: props.sort,
      sort_dir: props.sort_dir,
    });
  }

  private toEntity(entity: any): PropertyType {
    return new PropertyType({
      id: new UniqueEntityId(entity.id),
      key: entity.key,
      name: entity.name,
      description: entity.description,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    });
  }
}
