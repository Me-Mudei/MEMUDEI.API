import { User } from "../../domain/entities";
import { UserRepository } from "../../domain/repository";
import { PrismaClient } from "../../../shared/infra/database";
import { UniqueEntityId } from "../../../shared/domain/value-objects";

export class UserPrismaRepository implements UserRepository.Repository {
  sortableFields: string[] = ["createdAt"];

  constructor(readonly prisma: PrismaClient) {}
  async insert(entity: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        email: entity.props.email,
        name: entity.props.name,
        role: {
          connectOrCreate: {
            where: {
              name: entity.props.role_name,
            },
            create: {
              name: entity.props.role_name,
            },
          },
        },
      },
    });
  }

  async findById(id: string | UniqueEntityId): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { id: id.toString() },
      include: {
        role: true,
      },
    });
    return new User({
      email: user.email,
      name: user.name,
      role_name: user.role.name,
    });
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      include: {
        role: true,
      },
    });
    return users.map(
      (user) =>
        new User({
          email: user.email,
          name: user.name,
          role_name: user?.role.name,
        })
    );
  }

  async update(entity: User): Promise<void> {
    await this.prisma.user.update({
      where: { id: entity.id },
      data: {
        email: entity.props.email,
        name: entity.props.name,
      },
    });
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    await this.prisma.user.delete({
      where: { id: id.toString() },
    });
  }

  async search(
    props: UserRepository.SearchParams
  ): Promise<UserRepository.SearchResult> {
    const offset = (props.page - 1) * props.per_page;
    const limit = props.per_page;

    const users = await this.prisma.user.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        ...(props.sort && this.sortableFields.includes(props.sort)
          ? { [props.sort]: props.sort_dir }
          : { created_at: "asc" }),
      },
      where: {
        ...(props.filter && {
          name: {
            contains: `${props.filter}`,
          },
        }),
      },
      include: {
        role: true,
      },
    });

    return new UserRepository.SearchResult({
      items: users.map(
        (user) =>
          new User({
            email: user.email,
            name: user.name,
            role_name: user?.role.name,
          })
      ),
      current_page: props.page,
      per_page: props.per_page,
      total: users.length,
      filter: props.filter,
      sort: props.sort,
      sort_dir: props.sort_dir,
    });
  }
}
