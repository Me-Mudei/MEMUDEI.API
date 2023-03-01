import { Role, User, UserRepository } from '#auth/domain';
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

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        role: true,
      },
    });
    return user ? this.toEntity(user) : undefined;
  }

  async hasPermission(id: string, scope: string): Promise<boolean> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
        role: {
          permissions: {
            some: {
              permission: {
                name: scope,
              },
            },
          },
        },
      },
      include: {
        role: true,
      },
    });
    return !!user;
  }

  private toEntity(
    user: Prisma.userGetPayload<Prisma.userFindUniqueArgs> & {
      role: Prisma.roleGetPayload<Prisma.roleFindUniqueArgs>;
    },
  ): User {
    return new User({
      id: new UniqueEntityId(user.id),
      created_at: new Date(user.created_at),
      updated_at: new Date(user.updated_at),
      email: user.email,
      role: new Role({
        name: user.role.name,
        id: new UniqueEntityId(user.role.id),
        created_at: new Date(user.role.created_at),
        updated_at: new Date(user.role.updated_at),
      }),
    });
  }
}
