import { NotFoundError, UniqueEntityId } from "#shared/domain";
import { PrismaClient } from "#shared/infra";

import {
  Charge,
  ChargeRepository,
  ChargeSearchParams,
  ChargeSearchResult,
} from "../../../domain";

export class ChargePrismaRepository implements ChargeRepository {
  sortableFields: string[] = ["createdAt"];
  constructor(readonly prisma: PrismaClient) {}

  async insert(entity: Charge): Promise<void> {
    await this.prisma.charge.create({
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

  async findById(id: string | UniqueEntityId): Promise<Charge> {
    const charge = await this.prisma.charge
      .findFirstOrThrow({
        where: { id: id.toString() },
      })
      .catch((_err) => {
        throw new NotFoundError(`Entity Not Found using ID ${id}`);
      });

    return this.toEntity(charge);
  }

  async findManyById(ids: (string | UniqueEntityId)[]): Promise<Charge[]> {
    const charges = await this.prisma.charge.findMany({
      where: {
        id: {
          in: ids.map((id) => id.toString()),
        },
      },
    });
    return charges.map((charge) => this.toEntity(charge));
  }

  async findAll(): Promise<Charge[]> {
    const charges = await this.prisma.charge.findMany();
    return charges.map((charge) => this.toEntity(charge));
  }

  async update(entity: Charge): Promise<void> {
    await this.prisma.charge.update({
      where: { id: entity.id },
      data: {
        key: entity.key,
        name: entity.name,
        description: entity.description,
      },
    });
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    await this.prisma.charge.delete({
      where: { id: id.toString() },
    });
  }

  async search(props: ChargeSearchParams): Promise<ChargeSearchResult> {
    const offset = (props.page - 1) * props.per_page;
    const limit = props.per_page;

    const charges = await this.prisma.charge.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        ...(props.sort && this.sortableFields.includes(props.sort)
          ? { [props.sort]: props.sort_dir }
          : { created_at: "asc" }),
      },
    });
    return new ChargeSearchResult({
      items: charges.map((charge) => this.toEntity(charge)),
      current_page: props.page,
      per_page: props.per_page,
      total: charges.length,
      filter: props.filter,
      sort: props.sort,
      sort_dir: props.sort_dir,
    });
  }

  private toEntity(entity: any): Charge {
    return new Charge({
      id: new UniqueEntityId(entity.id),
      key: entity.key,
      name: entity.name,
      description: entity.description,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    });
  }
}
