import { NotFoundError, UniqueEntityId } from "#shared/domain";
import { PrismaClient } from "#shared/infra";

import {
  CondominiumDetail,
  CondominiumDetailRepository,
  CondominiumDetailSearchParams,
  CondominiumDetailSearchResult,
} from "../../../domain";

export class CondominiumDetailPrismaRepository
  implements CondominiumDetailRepository
{
  sortableFields: string[] = ["createdAt"];
  constructor(readonly prisma: PrismaClient) {}

  async insert(entity: CondominiumDetail): Promise<void> {
    await this.prisma.condominiumDetail.create({
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

  async findById(id: string | UniqueEntityId): Promise<CondominiumDetail> {
    const condominiumDetail = await this.prisma.condominiumDetail
      .findFirstOrThrow({
        where: { id: id.toString() },
      })
      .catch((_err) => {
        throw new NotFoundError(`Entity Not Found using ID ${id}`);
      });

    return this.toEntity(condominiumDetail);
  }

  async findManyById(
    ids: (string | UniqueEntityId)[],
  ): Promise<CondominiumDetail[]> {
    const condominiumDetails = await this.prisma.condominiumDetail.findMany({
      where: {
        id: {
          in: ids.map((id) => id.toString()),
        },
      },
    });
    return condominiumDetails.map((condominiumDetail) =>
      this.toEntity(condominiumDetail),
    );
  }

  async findAll(): Promise<CondominiumDetail[]> {
    const condominiumDetails = await this.prisma.condominiumDetail.findMany();
    return condominiumDetails.map((condominiumDetail) =>
      this.toEntity(condominiumDetail),
    );
  }

  async update(entity: CondominiumDetail): Promise<void> {
    await this.prisma.condominiumDetail.update({
      where: { id: entity.id },
      data: {
        key: entity.key,
        name: entity.name,
        description: entity.description,
      },
    });
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    await this.prisma.condominiumDetail.delete({
      where: { id: id.toString() },
    });
  }

  async search(
    props: CondominiumDetailSearchParams,
  ): Promise<CondominiumDetailSearchResult> {
    const offset = (props.page - 1) * props.per_page;
    const limit = props.per_page;

    const condominiumDetails = await this.prisma.condominiumDetail.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        ...(props.sort && this.sortableFields.includes(props.sort)
          ? { [props.sort]: props.sort_dir }
          : { created_at: "asc" }),
      },
    });
    return new CondominiumDetailSearchResult({
      items: condominiumDetails.map((condominiumDetail) =>
        this.toEntity(condominiumDetail),
      ),
      current_page: props.page,
      per_page: props.per_page,
      total: condominiumDetails.length,
      filter: props.filter,
      sort: props.sort,
      sort_dir: props.sort_dir,
    });
  }

  private toEntity(entity: any): CondominiumDetail {
    return new CondominiumDetail({
      id: new UniqueEntityId(entity.id),
      key: entity.key,
      name: entity.name,
      description: entity.description,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    });
  }
}
