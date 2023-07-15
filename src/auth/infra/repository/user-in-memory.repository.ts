import { UniqueEntityId } from "#shared/domain";

import { User, UserRepository } from "../../domain";

interface UserRO {
  id: string;
  external_id: string;
}
export class UserInMemoryRepository implements UserRepository {
  private users: UserRO[] = [];

  async findByExternalId(external_id: string): Promise<User> {
    const user = await this.getUser({ external_id });
    if (!user) throw new Error("User not found");
    return this.toEntity(user);
  }

  async getUser(field: { [key: string]: string }): Promise<UserRO> {
    return this.users.find((user) => user[field.key] === field.value);
  }

  private toEntity(user: UserRO): User {
    return new User({
      id: new UniqueEntityId(user.id),
      external_id: user.external_id
    });
  }
}
