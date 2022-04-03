import { PrismaClient } from '@prisma/client';
import UserDAO from '../../app/dao/UserDAO';

export default class UserPrismaDAO implements UserDAO {
  constructor(private readonly prisma: PrismaClient) {}

  async findUnique(query: { [key: string]: string }): Promise<any> {
    return this.prisma.user.findUnique({ where: query });
  }
}
