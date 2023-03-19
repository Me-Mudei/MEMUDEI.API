import { NotFoundError, UniqueEntityId } from '#shared/domain';
import {
  Calendar,
  CalendarRepository,
  CalendarSearchParams,
  CalendarSearchResult,
} from '../../../domain';
import { PrismaClient } from '#shared/infra';

export class CalendarPrismaRepository implements CalendarRepository {
  sortableFields: string[] = ['createdAt'];
  constructor(readonly prisma: PrismaClient) {}

  async insert(entity: Calendar): Promise<void> {
    this.prisma.calendar.create({
      data: {
        id: entity.id,
        user_id: (entity as any).user.id,
        is_active: entity.is_active,
        expired_at: entity.expired_at,
        created_at: entity.created_at,
        updated_at: entity.updated_at,
      },
    });

    this.prisma.weekday.createMany({
      data: (entity as any).available_weekdays.map((weekday) => ({
        id: weekday.id,
        calendar_id: entity.id,
        day: weekday.day,
        available_hours: weekday.hours.map((hour) => hour.value),
        created_at: weekday.created_at,
        updated_at: weekday.updated_at,
      })),
    });
  }

  async findById(id: string | UniqueEntityId): Promise<Calendar> {
    const calendar = await this.prisma.calendar
      .findFirstOrThrow({
        where: { id: id.toString() },
      })
      .catch((_err) => {
        throw new NotFoundError(`Entity Not Found using ID ${id}`);
      });

    return this.toEntity(calendar);
  }

  async findManyById(ids: (string | UniqueEntityId)[]): Promise<Calendar[]> {
    const calendars = await this.prisma.calendar.findMany({
      where: {
        id: {
          in: ids.map((id) => id.toString()),
        },
      },
    });
    return calendars.map((calendar) => this.toEntity(calendar));
  }

  async findAll(): Promise<Calendar[]> {
    const calendars = await this.prisma.calendar.findMany();
    return calendars.map((calendar) => this.toEntity(calendar));
  }

  async update(entity: Calendar): Promise<void> {
    await this.prisma.calendar.update({
      where: { id: entity.id },
      data: {},
    });
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    await this.prisma.calendar.delete({
      where: { id: id.toString() },
    });
  }

  async search(props: CalendarSearchParams): Promise<CalendarSearchResult> {
    const offset = (props.page - 1) * props.per_page;
    const limit = props.per_page;

    const calendars = await this.prisma.calendar.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        ...(props.sort && this.sortableFields.includes(props.sort)
          ? { [props.sort]: props.sort_dir }
          : { created_at: 'asc' }),
      },
    });
    return new CalendarSearchResult({
      items: calendars.map((calendar) => this.toEntity(calendar)),
      current_page: props.page,
      per_page: props.per_page,
      total: calendars.length,
      filter: props.filter,
      sort: props.sort,
      sort_dir: props.sort_dir,
    });
  }

  private toEntity(entity: any): Calendar {
    return new Calendar({
      id: new UniqueEntityId(entity.id),
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    });
  }
}
