import { PrismaClient } from '@prisma/client';
import User from '../../domain/entity/User';
import UserRepository from '../../domain/repository/UserRepository';

export default class UserPrismaRepository implements UserRepository {
  constructor(readonly db: PrismaClient) {}
  async create(user: User): Promise<void> {
    await this.db.user.create({
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
    await this.db.user.update({
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
