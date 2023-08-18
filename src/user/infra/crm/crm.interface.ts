import { User } from "#user/domain";

export interface CRM {
  createUser(user: User): Promise<void>;
  deleteUser(id: string): Promise<void>;
}
