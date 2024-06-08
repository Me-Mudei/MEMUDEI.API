import { AuthProvider as EnumAuthProvider, User } from "../../domain";

export type ProviderValidateInput<T> = {
  user: {
    provider: string;
    email: string;
    external_id?: string;
    password?: string;
  };
  provider_user: T;
};
export interface AuthProvider {
  provider: EnumAuthProvider;
  authenticate(input: any): Promise<User>;
  validate(input: ProviderValidateInput<any>): Promise<boolean>;
  findUser?<T extends Record<string, string>>(input: any): Promise<T>;
}
