import { User, UserRepository } from '#auth/domain';

export class UserInMemoryRepository implements UserRepository {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
