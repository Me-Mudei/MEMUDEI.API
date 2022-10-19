import { Property } from '../../../domain/entities';
import { PropertyRepository } from '../../../domain/repository';
import { PrismaClient } from '../../../../shared/infra/database';
import { UniqueEntityId } from '../../../../shared/domain/value-objects';

export class PropertyPrismaRepository implements PropertyRepository.Repository {
  sortableFields: string[] = ['createdAt'];

  constructor(readonly prisma: PrismaClient) {}
  async insert(entity: Property): Promise<void> {
    await this.prisma.property.create({
      data: {
        email: entity.props.email,
        name: entity.props.name,
        role: {
          connectOrCreate: {
            where: {
              name: entity.props.role_name,
            },
            create: {
              name: entity.props.role_name,
            },
          },
        },
      },
    });
  }

  async findById(id: string | UniqueEntityId): Promise<Property> {
    const property = await this.prisma.property.findFirst({
      where: { id: id.toString() },
      include: {
        role: true,
      },
    });
    return new Property({
      email: property.email,
      name: property.name,
      role_name: property.role.name,
    });
  }

  async findAll(): Promise<Property[]> {
    const propertys = await this.prisma.property.findMany({
      include: {
        role: true,
      },
    });
    return propertys.map(
      (property) =>
        new Property({
          email: property.email,
          name: property.name,
          role_name: property?.role.name,
        }),
    );
  }

  async update(entity: Property): Promise<void> {
    await this.prisma.property.update({
      where: { id: entity.id },
      data: {
        email: entity.props.email,
        name: entity.props.name,
      },
    });
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    await this.prisma.property.delete({
      where: { id: id.toString() },
    });
  }

  async search(
    props: PropertyRepository.SearchParams,
  ): Promise<PropertyRepository.SearchResult> {
    const offset = (props.page - 1) * props.per_page;
    const limit = props.per_page;

    const propertys = await this.prisma.property.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        ...(props.sort && this.sortableFields.includes(props.sort)
          ? { [props.sort]: props.sort_dir }
          : { created_at: 'asc' }),
      },
      where: {
        ...(props.filter && {
          name: {
            contains: `${props.filter}`,
          },
        }),
      },
      include: {
        role: true,
      },
    });

    return new PropertyRepository.SearchResult({
      items: propertys.map(
        (property) =>
          new Property({
            email: property.email,
            name: property.name,
            role_name: property?.role.name,
          }),
      ),
      current_page: props.page,
      per_page: props.per_page,
      total: propertys.length,
      filter: props.filter,
      sort: props.sort,
      sort_dir: props.sort_dir,
    });
  }
}
