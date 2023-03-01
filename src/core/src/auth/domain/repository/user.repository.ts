import { User } from '../entities';

export interface UserRepository {
  findByEmail(email: string): Promise<User>;
  hasPermission(id: string, scope: string): Promise<boolean>;
}
