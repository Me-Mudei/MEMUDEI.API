import { User, UserRepository } from '../../domain';
import { UniqueEntityId } from '#shared/domain';
import { PrismaClient, Prisma } from '#shared/infra';

export class UserPrismaRepository implements UserRepository {
  static instance: UserPrismaRepository;

  constructor(readonly prisma: PrismaClient) {}

  static getInstance(prisma: PrismaClient): UserPrismaRepository {
    if (!UserPrismaRepository.instance) {
      UserPrismaRepository.instance = new UserPrismaRepository(prisma);
    }
    return UserPrismaRepository.instance;
  }

  async findByExternalId(external_id: string): Promise<User> {
    const user = await this.prisma.user.findFirstOrThrow({
      where: { external_id, deleted_at: null, disabled_at: null },
    });
    return this.toEntity(user);
  }

  private toEntity(
    user: Prisma.userGetPayload<Prisma.userFindUniqueArgs>,
  ): User {
    return new User({
      id: new UniqueEntityId(user.id),
      created_at: new Date(user.created_at),
      updated_at: new Date(user.updated_at),
      external_id: user.external_id,
    });
  }
}
