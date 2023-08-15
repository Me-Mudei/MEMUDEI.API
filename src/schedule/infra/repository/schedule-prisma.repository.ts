import { NotFoundError, UniqueEntityId } from "#shared/domain";
import { PrismaClient } from "#shared/infra";

import {
  Schedule,
  ScheduleRepository,
  ScheduleSearchParams,
  ScheduleSearchResult
} from "../../domain";

export class SchedulePrismaRepository implements ScheduleRepository {
  sortableFields: string[] = ["createdAt"];
  constructor(readonly prisma: PrismaClient) {}

  async insert(entity: any): Promise<void> {
    await this.prisma.event.create({
      data: {
        id: entity.id,
        start: entity.start,
        end: entity.end,
        calendar_id: entity.calendar.id,
        title: entity.title,
        obs: entity.obs,
        property_id: entity.property.id,
        scheduler_id: entity.scheduler.id,
        created_at: entity.created_at,
        updated_at: entity.updated_at
      }
    });
  }

  async findById(id: string | UniqueEntityId): Promise<Schedule> {
    const schedule = await this.prisma.schedule
      .findFirstOrThrow({
        where: { id: id.toString() }
      })
      .catch((_err) => {
        throw new NotFoundError(`Entity Not Found using ID ${id}`);
      });

    return this.toEntity(schedule);
  }

  async findManyById(ids: (string | UniqueEntityId)[]): Promise<Schedule[]> {
    const schedules = await this.prisma.schedule.findMany({
      where: {
        id: {
          in: ids.map((id) => id.toString())
        }
      }
    });
    return schedules.map((schedule) => this.toEntity(schedule));
  }

  async findAll(): Promise<Schedule[]> {
    const schedules = await this.prisma.schedule.findMany();
    return schedules.map((schedule) => this.toEntity(schedule));
  }

  async update(entity: Schedule): Promise<void> {
    await this.prisma.schedule.update({
      where: { id: entity.id },
      data: {}
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
      }
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

  private toEntity(entity: any): Schedule {
    return new Schedule({
      id: new UniqueEntityId(entity.id),
      start: entity.start,
      created_at: entity.created_at,
      updated_at: entity.updated_at
    });
  }
}
