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
} from '../../domain/entities';
import {
  PropertyFilter,
  PropertyRepository,
  PropertySearchParams,
  PropertySearchResult,
} from '../../domain/repository';
import { PrismaClient, Prisma } from '#shared/infra';
import { UniqueEntityId, NotFoundError } from '#shared/domain';

export class PropertyPrismaRepository implements PropertyRepository {
  sortableFields: string[] = ['createdAt'];
  static instance: PropertyPrismaRepository;

  constructor(readonly prisma: PrismaClient) {}

  static getInstance(prisma: PrismaClient): PropertyPrismaRepository {
    if (!PropertyPrismaRepository.instance) {
      PropertyPrismaRepository.instance = new PropertyPrismaRepository(prisma);
    }
    return PropertyPrismaRepository.instance;
  }
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
            id: entity.user_id.value,
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
              charge_key: charge.key,
              amount: charge.amount,
              created_at: charge.created_at,
              updated_at: charge.updated_at,
            })),
          },
        },
        floor_plans: {
          createMany: {
            data: entity.floor_plans.map((floor_plan) => ({
              floor_plan_key: floor_plan.key,
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
              condominium_detail_key: condominium_detail.key,
              available: condominium_detail.available,
              created_at: condominium_detail.created_at,
              updated_at: condominium_detail.updated_at,
            })),
          },
        },
        property_details: {
          createMany: {
            data: entity.property_details.map((property_detail) => ({
              property_detail_key: property_detail.key,
              available: property_detail.available,
              created_at: property_detail.created_at,
              updated_at: property_detail.updated_at,
            })),
          },
        },
        rules: {
          createMany: {
            data: entity.rules.map((rule) => ({
              rule_key: rule.key,
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
        status: entity.status,
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
    let items: Property[];

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

    items = properties.map((property) => this.toEntity(property));

    if (
      props?.filter &&
      props.filter?.value_type &&
      props.filter.value_type === 'all' &&
      props.filter?.min_value &&
      props.filter?.max_value
    ) {
      items = this.totalValueFilter(
        properties,
        props.filter.min_value,
        props.filter.max_value,
      );
    }

    return new PropertySearchResult({
      items,
      current_page: props.page,
      per_page: props.per_page,
      total: properties.length,
      filter: props.filter,
      sort: props.sort || 'created_at',
      sort_dir: props.sort_dir || 'asc',
    });
  }

  private includes(): Prisma.propertyInclude {
    return {
      address: true,
      privacy_type: true,
      property_type: true,
      property_relationship: true,
      photos: {
        include: {
          file: {
            select: {
              id: true,
              name: true,
              url: true,
              description: true,
              file: true,
              subtype: true,
              type: true,
              created_at: true,
              updated_at: true,
            },
          },
        },
      },
      condominium_details: {
        include: {
          condominium_detail: {
            select: {
              name: true,
              description: true,
            },
          },
        },
      },
      property_details: {
        include: {
          property_detail: {
            select: {
              name: true,
              description: true,
            },
          },
        },
      },
      rules: {
        include: {
          rule: {
            select: {
              name: true,
              description: true,
            },
          },
        },
      },
      charges: {
        include: {
          charge: {
            select: {
              name: true,
              description: true,
            },
          },
        },
      },
      floor_plans: {
        include: {
          floor_plan: {
            select: {
              name: true,
              unit: true,
            },
          },
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
          key: charge.charge_key,
          name: charge.charge.name,
          description: charge.charge.description,
          amount: charge.amount,
          created_at: charge.created_at,
          updated_at: charge.updated_at,
        }),
    );
    const photos = property.photos.map(
      (photo) =>
        new Photo({
          id: new UniqueEntityId(photo.file.id),
          url: photo.file.url,
          file: photo.file.file,
          name: photo.file.name,
          subtype: photo.file.subtype,
          type: photo.file.type,
          description: photo.file.description,
          created_at: photo.file.created_at,
          updated_at: photo.file.updated_at,
        }),
    );
    const floor_plans = property.floor_plans.map(
      (floor_plan) =>
        new FloorPlan({
          id: new UniqueEntityId(floor_plan.id),
          key: floor_plan.floor_plan_key,
          name: floor_plan.floor_plan.name,
          unit: floor_plan.floor_plan.unit,
          value: floor_plan.value,
          created_at: floor_plan.created_at,
          updated_at: floor_plan.updated_at,
        }),
    );
    const condominium_details = property.condominium_details.map(
      (condominium_detail) =>
        new CondominiumDetail({
          id: new UniqueEntityId(condominium_detail.condominium_detail_id),
          key: condominium_detail.condominium_detail_key,
          name: condominium_detail.condominium_detail.name,
          description: condominium_detail.condominium_detail.description,
          available: condominium_detail.available,
          created_at: condominium_detail.created_at,
          updated_at: condominium_detail.updated_at,
        }),
    );
    const property_details = property.property_details.map(
      (property_detail) =>
        new PropertyDetail({
          id: new UniqueEntityId(property_detail.property_detail_id),
          key: property_detail.property_detail_key,
          name: property_detail.property_detail.name,
          description: property_detail.property_detail.description,
          available: property_detail.available,
          created_at: property_detail.created_at,
          updated_at: property_detail.updated_at,
        }),
    );
    const rules = property.rules.map(
      (rule) =>
        new Rule({
          id: new UniqueEntityId(rule.rule_id),
          key: rule.rule_key,
          name: rule.rule.name,
          description: rule.rule.description,
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
      user_id: new UniqueEntityId(property.user_id),
      created_at: property.created_at,
      updated_at: property.updated_at,
    });
  }

  private totalValueFilter(
    properties: any[],
    min: number,
    max: number,
  ): Property[] {
    const filteredProperties = properties.filter((property) => {
      const totalValue = property.charges.reduce(
        (total, charge) => total + charge.amount,
        0,
      );
      return totalValue >= min && totalValue <= max;
    });
    return filteredProperties.map((property) => this.toEntity(property));
  }

  private applyFilters(filter: PropertyFilter): Prisma.propertyWhereInput {
    let where: Prisma.propertyWhereInput = {};
    if (!filter || Object.keys(filter).length === 0) {
      return where;
    }
    const ignoredKeyList = ['max_', 'value_type'];
    for (const key in filter) {
      if (!filter[key] || ignoredKeyList.find((item) => key.includes(item))) {
        continue;
      }
      if (key.includes('min_')) {
        const field = key.replace('min_', '');
        if (field === 'value') {
          where = this[`${field}_filter`](
            where,
            filter[`min_${field}`],
            filter[`max_${field}`],
            filter.value_type,
          );
          continue;
        }
        where = this[`${field}_filter`](
          where,
          filter[`min_${field}`],
          filter[`max_${field}`],
        );
        continue;
      }
      where = this[`${key}_filter`](where, filter[key]);
    }
    return where;
  }

  rules_filter(
    where: Prisma.propertyWhereInput,
    rules: string[],
  ): Prisma.propertyWhereInput {
    return {
      ...where,
      rules: {
        every: {
          rule: {
            key: {
              in: rules,
            },
          },
        },
      },
    };
  }

  condominium_details_filter(
    where: Prisma.propertyWhereInput,
    condominiumDetails: string[],
  ): Prisma.propertyWhereInput {
    return {
      ...where,
      condominium_details: {
        every: {
          condominium_detail: {
            key: {
              in: condominiumDetails,
            },
          },
        },
      },
    };
  }

  property_details_filter(
    where: Prisma.propertyWhereInput,
    propertyDetails: string[],
  ): Prisma.propertyWhereInput {
    return {
      ...where,
      property_details: {
        every: {
          property_detail: {
            key: {
              in: propertyDetails,
            },
          },
        },
      },
    };
  }

  privacy_type_filter(
    where: Prisma.propertyWhereInput,
    privacyType: string,
  ): Prisma.propertyWhereInput {
    return {
      ...where,
      privacy_type: {
        key: privacyType,
      },
    };
  }

  property_type_filter(
    where: Prisma.propertyWhereInput,
    propertyType: string,
  ): Prisma.propertyWhereInput {
    return {
      ...where,
      property_type: {
        key: propertyType,
      },
    };
  }

  query_filter(
    where: Prisma.propertyWhereInput,
    query: string,
  ): Prisma.propertyWhereInput {
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

  id_filter(
    where: Prisma.propertyWhereInput,
    id: string,
  ): Prisma.propertyWhereInput {
    return {
      ...where,
      id: {
        contains: id,
      },
    };
  }

  status_filter(
    where: Prisma.propertyWhereInput,
    status: PropertyStatus,
  ): Prisma.propertyWhereInput {
    return {
      ...where,
      status: {
        equals: status,
      },
    };
  }

  value_filter(
    where: Prisma.propertyWhereInput,
    min: number,
    max: number,
    key: string,
  ): Prisma.propertyWhereInput {
    const amountFilter = { amount: { gte: min, lte: max } };
    const filter =
      key === 'all'
        ? {
            OR: [
              { charge_key: 'rent', amount: amountFilter.amount },
              { charge_key: 'condominium', amount: amountFilter.amount },
              { charge_key: 'iptu', amount: amountFilter.amount },
              { charge_key: 'other', amount: amountFilter.amount },
            ],
          }
        : { charge_key: key, amount: amountFilter.amount };
    return { ...where, charges: { some: filter } };
  }

  footage_filter(
    where: Prisma.propertyWhereInput,
    min: number,
    max: number,
  ): Prisma.propertyWhereInput {
    return {
      ...where,
      floor_plans: {
        some: {
          floor_plan_key: {
            equals: 'footage',
          },
          value: {
            gte: min,
            lte: max,
          },
        },
      },
    };
  }

  qtd_bedrooms_filter(
    where: Prisma.propertyWhereInput,
    qtd: number,
  ): Prisma.propertyWhereInput {
    return {
      ...where,
      floor_plans: {
        some: {
          floor_plan_key: {
            equals: 'bedrooms',
          },
          value: {
            gte: qtd,
          },
        },
      },
    };
  }

  qtd_bathrooms_filter(
    where: Prisma.propertyWhereInput,
    qtd: number,
  ): Prisma.propertyWhereInput {
    return {
      ...where,
      floor_plans: {
        some: {
          floor_plan_key: {
            equals: 'bathrooms',
          },
          value: {
            gte: qtd,
          },
        },
      },
    };
  }
}
