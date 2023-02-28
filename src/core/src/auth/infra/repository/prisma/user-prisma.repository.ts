import { User, UserRepository } from '#auth/domain';
import { UniqueEntityId } from '#shared/domain';
import { PrismaClient } from '#shared/infra';

export class UserPrismaRepository implements UserRepository {
  static instance: UserPrismaRepository;

  constructor(readonly prisma: PrismaClient) {}

  static getInstance(prisma: PrismaClient): UserPrismaRepository {
    if (!UserPrismaRepository.instance) {
      UserPrismaRepository.instance = new UserPrismaRepository(prisma);
    }
    return UserPrismaRepository.instance;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user ? this.toEntity(user) : undefined;
  }

  private toEntity(user: any): User {
    return new User({
      id: new UniqueEntityId(user.id),
      created_at: new Date(user.created_at),
      updated_at: new Date(user.updated_at),
      email: user.email,
    });
  }
}
