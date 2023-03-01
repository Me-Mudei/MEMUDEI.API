import { Role, User, UserRepository } from '#auth/domain';
import { UniqueEntityId } from '#shared/domain';

interface UserRO {
  id: string;
  email: string;
  role: {
    name: string;
    permissions: {
      name: string;
    }[];
  };
}
export class UserInMemoryRepository implements UserRepository {
  private users: UserRO[] = [];

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.getUser({ email });
    return this.toEntity(user);
  }

  async hasPermission(id: string, scope: string): Promise<boolean> {
    const user = await this.getUser({ id });
    const hasScope = user?.role.permissions.find(
      (permission) => permission.name === scope,
    );
    return !!hasScope;
  }

  async getUser(field: { [key: string]: string }): Promise<UserRO> {
    return this.users.find((user) => user[field.key] === field.value);
  }

  private toEntity(user: UserRO): User {
    return new User({
      id: new UniqueEntityId(user.id),
      email: user.email,
      role: new Role({
        name: user.role.name,
      }),
    });
  }
}
