import { NotFoundError, UniqueEntityId } from "#shared/domain";
import { PrismaClient } from "#shared/infra";

import {
  PropertyDetail,
  PropertyDetailRepository,
  PropertyDetailSearchParams,
  PropertyDetailSearchResult,
} from "../../../domain";

export class PropertyDetailPrismaRepository
  implements PropertyDetailRepository
{
  sortableFields: string[] = ["createdAt"];
  constructor(readonly prisma: PrismaClient) {}

  async insert(entity: PropertyDetail): Promise<void> {
    await this.prisma.propertyDetail.create({
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

  async findById(id: string | UniqueEntityId): Promise<PropertyDetail> {
    const propertyDetail = await this.prisma.propertyDetail
      .findFirstOrThrow({
        where: { id: id.toString() },
      })
      .catch((_err) => {
        throw new NotFoundError(`Entity Not Found using ID ${id}`);
      });

    return this.toEntity(propertyDetail);
  }

  async findManyById(
    ids: (string | UniqueEntityId)[],
  ): Promise<PropertyDetail[]> {
    const propertyDetails = await this.prisma.propertyDetail.findMany({
      where: {
        id: {
          in: ids.map((id) => id.toString()),
        },
      },
    });
    return propertyDetails.map((propertyDetail) =>
      this.toEntity(propertyDetail),
    );
  }

  async findAll(): Promise<PropertyDetail[]> {
    const propertyDetails = await this.prisma.propertyDetail.findMany();
    return propertyDetails.map((propertyDetail) =>
      this.toEntity(propertyDetail),
    );
  }

  async update(entity: PropertyDetail): Promise<void> {
    await this.prisma.propertyDetail.update({
      where: { id: entity.id },
      data: {
        key: entity.key,
        name: entity.name,
        description: entity.description,
      },
    });
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    await this.prisma.propertyDetail.delete({
      where: { id: id.toString() },
    });
  }

  async search(
    props: PropertyDetailSearchParams,
  ): Promise<PropertyDetailSearchResult> {
    const offset = (props.page - 1) * props.per_page;
    const limit = props.per_page;

    const propertyDetails = await this.prisma.propertyDetail.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        ...(props.sort && this.sortableFields.includes(props.sort)
          ? { [props.sort]: props.sort_dir }
          : { created_at: "asc" }),
      },
    });
    return new PropertyDetailSearchResult({
      items: propertyDetails.map((propertyDetail) =>
        this.toEntity(propertyDetail),
      ),
      current_page: props.page,
      per_page: props.per_page,
      total: propertyDetails.length,
      filter: props.filter,
      sort: props.sort,
      sort_dir: props.sort_dir,
    });
  }

  private toEntity(entity: any): PropertyDetail {
    return new PropertyDetail({
      id: new UniqueEntityId(entity.id),
      key: entity.key,
      name: entity.name,
      description: entity.description,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    });
  }
}
