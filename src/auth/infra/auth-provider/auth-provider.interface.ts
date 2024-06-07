import { AuthProvider as EnumAuthProvider, User } from "../../domain";

export interface AuthProvider {
  provider: EnumAuthProvider;
  authenticate(input: any): Promise<User>;
  validate(input: any): Promise<User>;
}
