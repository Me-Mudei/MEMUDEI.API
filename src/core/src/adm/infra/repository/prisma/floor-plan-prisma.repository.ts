import { NotFoundError, UniqueEntityId } from '#shared/domain';
import {
  FloorPlan,
  FloorPlanRepository,
  FloorPlanSearchParams,
  FloorPlanSearchResult,
} from '../../../domain';
import { PrismaClient } from '#shared/infra';

export class FloorPlanPrismaRepository implements FloorPlanRepository {
  sortableFields: string[] = ['createdAt'];
  constructor(readonly prisma: PrismaClient) {}

  async insert(entity: FloorPlan): Promise<void> {
    await this.prisma.floor_plan.create({
      data: {
        id: entity.id,
        name: entity.name,
        unit: entity.unit,
        created_at: entity.created_at,
        updated_at: entity.updated_at,
      },
    });
  }

  async findById(id: string | UniqueEntityId): Promise<FloorPlan> {
    const floorPlan = await this.prisma.floor_plan
      .findFirstOrThrow({
        where: { id: id.toString() },
      })
      .catch((_err) => {
        throw new NotFoundError(`Entity Not Found using ID ${id}`);
      });

    return this.toEntity(floorPlan);
  }

  async findManyById(ids: (string | UniqueEntityId)[]): Promise<FloorPlan[]> {
    const floorPlan = await this.prisma.floor_plan.findMany({
      where: {
        id: {
          in: ids.map((id) => id.toString()),
        },
      },
    });
    return floorPlan.map((condominiumDetail) =>
      this.toEntity(condominiumDetail),
    );
  }

  async findAll(): Promise<FloorPlan[]> {
    const floorPlans = await this.prisma.floor_plan.findMany();
    return floorPlans.map((floorPlan) => this.toEntity(floorPlan));
  }

  async update(entity: FloorPlan): Promise<void> {
    await this.prisma.floor_plan.update({
      where: { id: entity.id },
      data: {
        name: entity.name,
        unit: entity.unit,
      },
    });
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    await this.prisma.floor_plan.delete({
      where: { id: id.toString() },
    });
  }

  async search(props: FloorPlanSearchParams): Promise<FloorPlanSearchResult> {
    const offset = (props.page - 1) * props.per_page;
    const limit = props.per_page;

    const floorPlans = await this.prisma.floor_plan.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        ...(props.sort && this.sortableFields.includes(props.sort)
          ? { [props.sort]: props.sort_dir }
          : { created_at: 'asc' }),
      },
    });
    return new FloorPlanSearchResult({
      items: floorPlans.map((floorPlan) => this.toEntity(floorPlan)),
      current_page: props.page,
      per_page: props.per_page,
      total: floorPlans.length,
      filter: props.filter,
      sort: props.sort,
      sort_dir: props.sort_dir,
    });
  }

  private toEntity(entity: any): FloorPlan {
    return new FloorPlan({
      id: new UniqueEntityId(entity.id),
      name: entity.name,
      unit: entity.unit,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    });
  }
}
