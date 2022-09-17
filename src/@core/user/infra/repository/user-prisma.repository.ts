import User from "../../domain/entity/user.entity";
import UserRepository from "../../domain/repository/user.repository";
import PrismaConnection from "../../../@shared/infra/database/prisma";

export default class UserPrismaRepository implements UserRepository {
  constructor(readonly prisma: PrismaConnection) {}
  async create(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        Role: {
          connectOrCreate: {
            where: {
              name: user.roleName,
            },
            create: {
              name: user.roleName,
            },
          },
        },
      },
    });
  }
  async complete(user: User): Promise<void> {
    await this.prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        phone: user.phone,
        cpf: user.cpf,
        name: user.name,
        description: user.description,
        born: user.born,
        Role: {
          connectOrCreate: {
            where: {
              name: user.roleName,
            },
            create: {
              name: user.roleName,
            },
          },
        },
      },
    });
  }
}
