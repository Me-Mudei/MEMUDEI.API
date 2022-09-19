import User from "../../domain/entities/user.entity";
import UserRepository from "../../domain/repository/user.repository";
import PrismaConnection from "../../../@shared/infra/database/prisma";
import UniqueEntityId from "@core/src/@shared/domain/value-objects/unique-entity-id.vo";

export default class UserPrismaRepository implements UserRepository.Repository {
  sortableFields: string[] = ["createdAt"];

  constructor(readonly prisma: PrismaConnection) {}
  async insert(entity: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        email: entity.props.email,
        name: entity.props.name,
        Role: {
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
        Role: true,
        Address: true,
      },
    });
    return new User({
      email: user.email,
      name: user.name,
      role_name: user.roleId,
      phone: user.phone,
      born: user.born,
      description: user.description,
      disabled_at: user.disabledAt,
      deleted_at: user.deletedAt,
    });
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      include: {
        Role: true,
        Address: true,
      },
    });
    return users.map(
      (user) =>
        new User({
          email: user.email,
          name: user.name,
          role_name: user?.Role.name,
          phone: user.phone,
          born: user.born,
          description: user.description,
          disabled_at: user.disabledAt,
          deleted_at: user.deletedAt,
        })
    );
  }

  async update(entity: User): Promise<void> {
    await this.prisma.user.update({
      where: { id: entity.id },
      data: {
        email: entity.props.email,
        name: entity.props.name,
        phone: entity.props.phone,
        born: entity.props.born,
        description: entity.props.description,
        disabledAt: entity.props.disabled_at,
        deletedAt: entity.props.deleted_at,
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
          : { createdAt: "asc" }),
      },
      where: {
        ...(props.filter && {
          name: {
            contains: `${props.filter}`,
          },
        }),
      },
      include: {
        Address: true,
        Role: true,
      },
    });

    return new UserRepository.SearchResult({
      items: users.map(
        (user) =>
          new User({
            email: user.email,
            name: user.name,
            role_name: user?.Role.name,
            phone: user.phone,
            born: user.born,
            description: user.description,
            disabled_at: user.disabledAt,
            deleted_at: user.deletedAt,
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
