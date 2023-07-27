import { User } from "../entities";

export interface UserRepository {
  findByExternalId(external_id: string): Promise<User>;
}
