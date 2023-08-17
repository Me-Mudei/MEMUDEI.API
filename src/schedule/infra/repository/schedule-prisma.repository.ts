import { NotFoundError, UniqueEntityId } from "#shared/domain";
import { PrismaClient, Prisma } from "#shared/infra";

import {
  Schedule,
  ScheduleRepository,
  ScheduleSearchParams,
  ScheduleSearchResult,
  User
} from "../../domain";

export class SchedulePrismaRepository implements ScheduleRepository {
  sortableFields: string[] = ["createdAt"];
  constructor(readonly prisma: PrismaClient) {}

  async insert(entity: Schedule): Promise<void> {
    await this.prisma.schedule.create({
      data: {
        id: entity.id,
        status: entity.status,
        date_time: entity.date_time,
        note: entity.note,
        visitor: {
          connectOrCreate: {
            where: {
              email: entity.visitor.email
            },
            create: {
              id: entity.visitor.id,
              name: entity.visitor.name,
              email: entity.visitor.email,
              phone: entity.visitor.phone,
              type: "lead"
            }
          }
        },
        property: {
          connect: {
            id: entity.property_id
          }
        },
        created_at: entity.created_at,
        updated_at: entity.updated_at
      }
    });
  }

  async findById(id: string | UniqueEntityId): Promise<Schedule> {
    const schedule = await this.prisma.schedule
      .findFirstOrThrow({
        where: { id: id.toString() },
        include: this.includes()
      })
      .catch((_err) => {
        throw new NotFoundError(`Entity Not Found using ID ${id}`);
      });

    return this.toEntity(schedule);
  }

  async findAll(): Promise<Schedule[]> {
    const schedules = await this.prisma.schedule.findMany({
      include: this.includes()
    });
    return schedules.map((schedule) => this.toEntity(schedule));
  }

  async update(entity: Schedule): Promise<void> {
    await this.prisma.schedule.update({
      where: { id: entity.id },
      data: {
        date_time: entity.date_time,
        status: entity.status
      }
    });
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    await this.prisma.schedule.delete({
      where: { id: id.toString() }
    });
  }

  async search(props: ScheduleSearchParams): Promise<ScheduleSearchResult> {
    const offset = (props.page - 1) * props.per_page;
    const limit = props.per_page;

    const schedules = await this.prisma.schedule.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        ...(props.sort && this.sortableFields.includes(props.sort)
          ? { [props.sort]: props.sort_dir }
          : { created_at: "asc" })
      },
      include: this.includes()
    });
    return new ScheduleSearchResult({
      items: schedules.map((schedule) => this.toEntity(schedule)),
      current_page: props.page,
      per_page: props.per_page,
      total: schedules.length,
      filter: props.filter,
      sort: props.sort,
      sort_dir: props.sort_dir
    });
  }

  private includes(): Prisma.scheduleInclude {
    return {
      visitor: true
    };
  }

  private toEntity(entity: any): Schedule {
    const visitor = new User({
      id: new UniqueEntityId(entity.visitor.id),
      name: entity.visitor.name,
      email: entity.visitor.email,
      phone: entity.visitor.phone,
      created_at: entity.visitor.created_at,
      updated_at: entity.visitor.updated_at
    });
    return new Schedule({
      id: new UniqueEntityId(entity.id),
      status: entity.status,
      date_time: entity.date_time,
      property_id: new UniqueEntityId(entity.property_id),
      note: entity.note,
      visitor,
      created_at: entity.created_at,
      updated_at: entity.updated_at
    });
  }
}
