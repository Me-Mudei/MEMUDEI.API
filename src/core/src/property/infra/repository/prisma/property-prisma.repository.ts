import {
  Address,
  Charge,
  CondominiumDetail,
  FloorPlan,
  Photo,
  Property,
  PropertyDetail,
  PropertyStatus,
  Rule,
} from '../../../domain/entities';
import {
  PropertyFilter,
  PropertyRepository,
  PropertySearchParams,
  PropertySearchResult,
} from '../../../domain/repository';
import { PrismaClient } from '#shared/infra';
import { UniqueEntityId, NotFoundError } from '#shared/domain';

export class PropertyPrismaRepository implements PropertyRepository {
  sortableFields: string[] = ['createdAt'];

  constructor(readonly prisma: PrismaClient) {}
  async insert(entity: Property): Promise<void> {
    await this.prisma.property.create({
      data: {
        id: entity.id,
        title: entity.title,
        description: entity.description,
        status: entity.status,
        created_at: entity.created_at,
        updated_at: entity.updated_at,
        user: {
          connect: {
            id: 'MgxO159FtDCCYQYULEhBy',
          },
        },
        address: {
          create: {
            id: entity.address.id,
            zip_code: entity.address.zip_code,
            state: entity.address.state,
            city: entity.address.city,
            street: entity.address.street,
            district: entity.address.district,
            complement: entity.address.complement,
            created_at: entity.address.created_at,
            updated_at: entity.address.updated_at,
          },
        },
        charges: {
          createMany: {
            data: entity.charges.map((charge) => ({
              charge_id: charge.id,
              amount: charge.amount,
              created_at: charge.created_at,
              updated_at: charge.updated_at,
            })),
          },
        },
        photos: {
          createMany: {
            data: entity.photos.map((photo) => ({
              id: photo.id,
              url: photo.url,
              file: photo.file,
              name: photo.name,
              subtype: photo.subtype,
              type: photo.type,
              description: photo.description,
              created_at: photo.created_at,
              updated_at: photo.updated_at,
            })),
          },
        },
        floor_plans: {
          createMany: {
            data: entity.floor_plans.map((floor_plan) => ({
              floor_plan_id: floor_plan.id,
              value: floor_plan.value,
              created_at: floor_plan.created_at,
              updated_at: floor_plan.updated_at,
            })),
          },
        },
        privacy_type: {
          connect: {
            key: entity.privacy_type,
          },
        },
        property_type: {
          connect: {
            key: entity.property_type,
          },
        },
        property_relationship: {
          connect: {
            key: entity.property_relationship,
          },
        },
        condominium_details: {
          createMany: {
            data: entity.condominium_details.map((condominium_detail) => ({
              condominium_detail_id: condominium_detail.id,
              available: condominium_detail.available,
              created_at: condominium_detail.created_at,
              updated_at: condominium_detail.updated_at,
            })),
          },
        },
        property_details: {
          createMany: {
            data: entity.property_details.map((property_detail) => ({
              property_detail_id: property_detail.id,
              available: property_detail.available,
              created_at: property_detail.created_at,
              updated_at: property_detail.updated_at,
            })),
          },
        },
        rules: {
          createMany: {
            data: entity.rules.map((rule) => ({
              rule_id: rule.id,
              allowed: rule.allowed,
              created_at: rule.created_at,
              updated_at: rule.updated_at,
            })),
          },
        },
      },
    });
  }

  async findById(id: string | UniqueEntityId): Promise<Property> {
    const property = await this.prisma.property
      .findFirstOrThrow({
        where: { id: id.toString() },
        include: this.includes(),
      })
      .catch((_err) => {
        throw new NotFoundError(`Entity Not Found using ID ${id}`);
      });

    return this.toEntity(property);
  }

  async findManyById(ids: (string | UniqueEntityId)[]): Promise<Property[]> {
    const properties = await this.prisma.property.findMany({
      where: {
        id: {
          in: ids.map((id) => id.toString()),
        },
      },
      include: this.includes(),
    });
    return properties.map((property) => this.toEntity(property));
  }

  async findAll(): Promise<Property[]> {
    const properties = await this.prisma.property.findMany({
      include: this.includes(),
    });
    return properties.map((property) => this.toEntity(property));
  }

  async update(entity: Property): Promise<void> {
    await this.prisma.property.update({
      where: { id: entity.id },
      data: {
        title: entity.title,
        description: entity.description,
      },
    });
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    await this.prisma.property.delete({
      where: { id: id.toString() },
    });
  }

  async search(props: PropertySearchParams): Promise<PropertySearchResult> {
    const offset = (props.page - 1) * props.per_page;
    const limit = props.per_page;

    const properties = await this.prisma.property.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        ...(props.sort && this.sortableFields.includes(props.sort)
          ? { [props.sort]: props.sort_dir }
          : { created_at: 'asc' }),
      },
      where: this.applyFilters(props.filter),
      include: this.includes(),
    });
    return new PropertySearchResult({
      items: properties.map((property) => this.toEntity(property)),
      current_page: props.page,
      per_page: props.per_page,
      total: properties.length,
      filter: props.filter,
      sort: props.sort,
      sort_dir: props.sort_dir,
    });
  }

  private includes(): any {
    return {
      address: true,
      charges: true,
      photos: true,
      floor_plans: true,
      privacy_type: true,
      property_type: true,
      property_relationship: true,
      condominium_details: {
        include: {
          condominium_detail: true,
        },
      },
      property_details: {
        include: {
          property_detail: true,
        },
      },
      rules: {
        include: {
          rule: true,
        },
      },
    };
  }

  private toEntity(property: any): Property {
    const address = new Address({
      id: new UniqueEntityId(property.address.id),
      zip_code: property.address.zip_code,
      state: property.address.state,
      city: property.address.city,
      street: property.address.street,
      district: property.address.district,
      complement: property.address.complement,
      created_at: property.address.created_at,
      updated_at: property.address.updated_at,
    });
    const charges = property.charges.map(
      (charge) =>
        new Charge({
          id: new UniqueEntityId(charge.id),
          key: charge.key,
          amount: charge.amount,
          created_at: charge.created_at,
          updated_at: charge.updated_at,
        }),
    );
    const photos = property.photos.map(
      (photo) =>
        new Photo({
          id: new UniqueEntityId(photo.id),
          url: photo.url,
          file: photo.file,
          name: photo.name,
          subtype: photo.subtype,
          type: photo.type,
          description: photo.description,
          created_at: photo.created_at,
          updated_at: photo.updated_at,
        }),
    );
    const floor_plans = property.floor_plans.map(
      (floor_plan) =>
        new FloorPlan({
          id: new UniqueEntityId(floor_plan.id),
          key: floor_plan.key,
          value: floor_plan.value,
          created_at: floor_plan.created_at,
          updated_at: floor_plan.updated_at,
        }),
    );
    const condominium_details = property.condominium_details.map(
      (condominium_detail) =>
        new CondominiumDetail({
          id: new UniqueEntityId(condominium_detail.condominium_detail_id),
          key: condominium_detail.key,
          available: condominium_detail.available,
          created_at: condominium_detail.created_at,
          updated_at: condominium_detail.updated_at,
        }),
    );
    const property_details = property.property_details.map(
      (property_detail) =>
        new PropertyDetail({
          id: new UniqueEntityId(property_detail.property_detail_id),
          key: property_detail.key,
          available: property_detail.available,
          created_at: property_detail.created_at,
          updated_at: property_detail.updated_at,
        }),
    );
    const rules = property.rules.map(
      (rule) =>
        new Rule({
          id: new UniqueEntityId(rule.rule_id),
          key: rule.key,
          allowed: rule.allowed,
          created_at: rule.created_at,
          updated_at: rule.updated_at,
        }),
    );
    return new Property({
      id: new UniqueEntityId(property.id),
      title: property.title,
      description: property.description,
      address,
      photos,
      privacy_type: property.privacy_type.key,
      property_type: property.property_type.key,
      property_relationship: property.property_relationship.key,
      charges,
      floor_plans,
      condominium_details,
      property_details,
      rules,
      status: property.status as PropertyStatus,
      created_at: property.created_at,
      updated_at: property.updated_at,
    });
  }

  private applyFilters(filter: PropertyFilter): any {
    let where: any = {};
    if (!filter) {
      return where;
    }
    for (const key in filter) {
      if (filter[key]) {
        if (key.includes('min_')) {
          const field = key.replace('min_', '');
          where = this[field + '_filter'](
            where,
            filter[`min_${field}`],
            filter[`max_${field}`],
          );
          continue;
        } else if (key.includes('max_')) {
          continue;
        }
        where = this[key + '_filter'](where, filter[key]);
      }
    }
    return where;
  }

  rules_filter(where: any, rules: string[]): any {
    return {
      ...where,
      rules: {
        every: {
          rule: {
            name: {
              in: rules,
            },
          },
        },
      },
    };
  }

  condominium_details_filter(where: any, condominiumDetails: string[]): any {
    return {
      ...where,
      condominium_details: {
        every: {
          condominium_detail: {
            name: {
              in: condominiumDetails,
            },
          },
        },
      },
    };
  }

  property_details_filter(where: any, propertyDetails: string[]): any {
    return {
      ...where,
      property_details: {
        every: {
          property_detail: {
            name: {
              in: propertyDetails,
            },
          },
        },
      },
    };
  }

  privacy_type_filter(where: any, privacyType: string): any {
    return {
      ...where,
      privacy_type: {
        name: privacyType,
      },
    };
  }

  property_type_filter(where: any, propertyType: string): any {
    return {
      ...where,
      property_type: {
        name: propertyType,
      },
    };
  }

  query_filter(where: any, query: string): any {
    return {
      ...where,
      OR: [
        {
          title: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          address: {
            street: {
              contains: query,
              mode: 'insensitive',
            },
          },
        },
        {
          address: {
            city: {
              contains: query,
              mode: 'insensitive',
            },
          },
        },
        {
          address: {
            district: {
              contains: query,
              mode: 'insensitive',
            },
          },
        },
        {
          address: {
            state: {
              contains: query,
              mode: 'insensitive',
            },
          },
        },
        {
          address: {
            zip_code: {
              contains: query,
              mode: 'insensitive',
            },
          },
        },
      ],
    };
  }

  id_filter(where: any, id: string): any {
    return {
      ...where,
      id: {
        contains: id,
      },
    };
  }

  value_type_filter(where: any, type: 'total' | 'rent'): any {
    if (type === 'total') {
      return where;
    }
    return {
      ...where,
      charges: {
        every: {
          name: {
            equals: type,
          },
        },
      },
    };
  }

  value_filter(where: any, min: number, max: number): any {
    return {
      ...where,
      charges: {
        every: {
          amount: {
            gte: min,
            lte: max,
          },
        },
      },
    };
  }

  footage_filter(where: any, min: number, max: number): any {
    return {
      ...where,
      floor_plans: {
        every: {
          name: {
            contains: 'footage',
          },
          quantity: {
            gte: min,
            lte: max,
          },
        },
      },
    };
  }

  qtd_bedrooms_filter(where: any, qtd: number): any {
    return {
      ...where,
      floor_plans: {
        every: {
          name: {
            contains: 'bedrooms',
          },
          quantity: {
            gte: qtd,
          },
        },
      },
    };
  }

  qtd_bathrooms_filter(where: any, qtd: number): any {
    return {
      ...where,
      floor_plans: {
        every: {
          name: {
            contains: 'bathrooms',
          },
          quantity: {
            gte: qtd,
          },
        },
      },
    };
  }
}
