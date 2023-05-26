import { User } from '../../domain/entities';
import {
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
      where: {
        ...(props.filter && {
          name: {
            contains: `${props.filter}`,
          },
        }),
      },
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
}
