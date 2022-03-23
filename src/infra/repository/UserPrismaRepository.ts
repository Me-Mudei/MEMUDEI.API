import { PrismaClient } from '@prisma/client';
import User from '../../domain/entity/User';
import UserRepository from '../../domain/repository/UserRepository';

export default class UserPrismaRepository implements UserRepository {
  constructor(readonly db: PrismaClient) {}
  async create(user: User): Promise<void> {
    await this.db.user.create({
      data: {
        email: user.email,
        phone: user.phone,
        cpf: user.cpf,
        name: user.name,
        password: user.password,
        gender: user.gender,
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
