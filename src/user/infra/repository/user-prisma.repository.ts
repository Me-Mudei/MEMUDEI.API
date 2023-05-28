import { User } from '../../domain/entities';
import {
  UserFilter,
  UserRepository,
  UserSearchParams,
  UserSearchResult,
} from '../../domain/repository';
import { Prisma, PrismaClient } from '#shared/infra';
import { UniqueEntityId } from '#shared/domain';

export class UserPrismaRepository implements UserRepository {
  sortableFields: string[] = ['createdAt'];

  constructor(readonly prisma: PrismaClient) {}
  async insert(entity: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        email: entity.props.email,
        name: entity.props.name,
        external_id: entity.props.external_id,
      },
    });
  }

  async findById(id: string | UniqueEntityId): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { id: id.toString() },
    });
    return this.toEntity(user);
  }

  async findManyById(ids: (string | UniqueEntityId)[]): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: {
        id: {
          in: ids.map((id) => id.toString()),
        },
      },
    });
    return users.map((user) => this.toEntity(user));
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => this.toEntity(user));
  }

  async update(entity: User): Promise<void> {
    await this.prisma.user.update({
      where: { id: entity.id },
      data: {
        email: entity.props.email,
        name: entity.props.name,
        external_id: entity.props.external_id,
      },
    });
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    await this.prisma.user.delete({
      where: { id: id.toString() },
    });
  }

  async search(props: UserSearchParams): Promise<UserSearchResult> {
    const offset = (props.page - 1) * props.per_page;
    const limit = props.per_page;

    const users = await this.prisma.user.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        ...(props.sort && this.sortableFields.includes(props.sort)
          ? { [props.sort]: props.sort_dir }
          : { created_at: 'asc' }),
      },
      where: this.applyFilters(props.filter),
    });

    return new UserSearchResult({
      items: users.map((user) => this.toEntity(user)),
      current_page: props.page,
      per_page: props.per_page,
      total: users.length,
      filter: props.filter,
      sort: props.sort,
      sort_dir: props.sort_dir,
    });
  }

  async findFirst(props: UserSearchParams): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: this.applyFilters(props.filter),
    });
    if (!user) {
      return null;
    }
    return this.toEntity(user);
  }

  private toEntity(
    user: Prisma.userGetPayload<Prisma.userFindUniqueArgs>,
  ): User {
    return new User({
      id: new UniqueEntityId(user.id),
      external_id: user.external_id,
      name: user.name,
      email: user.email,
      created_at: new Date(user.created_at),
      updated_at: new Date(user.updated_at),
    });
  }

  private applyFilters(filter: UserFilter): Prisma.userWhereInput {
    let where: Prisma.userWhereInput = {};
    if (!filter || Object.keys(filter).length === 0) {
      return where;
    }
    for (const key in filter) {
      if (!filter[key]) {
        continue;
      }
      where = this[`${key}_filter`](where, filter[key]);
    }
    return where;
  }

  name_filter(
    where: Prisma.userWhereInput,
    name: string,
  ): Prisma.userWhereInput {
    return { ...where, name: { contains: name, mode: 'insensitive' } };
  }

  email_filter(
    where: Prisma.userWhereInput,
    email: string,
  ): Prisma.userWhereInput {
    return { ...where, email: { contains: email } };
  }

  external_id_filter(
    where: Prisma.userWhereInput,
    external_id: string,
  ): Prisma.userWhereInput {
    return { ...where, external_id: { contains: external_id } };
  }

  property_id_filter(
    where: Prisma.userWhereInput,
    property_id: string,
  ): Prisma.userWhereInput {
    return { ...where, properties: { some: { id: property_id } } };
  }
}
