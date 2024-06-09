import { AuthProvider } from "#auth/domain";

export type AuthUserOutput = {
  id: string;
  provider: AuthProvider;
  email: string;
  global_role?: string;
};

export class AuthUserOutputMapper {
  static toOutput(user: any): AuthUserOutput {
    return {
      id: user.id,
      provider: user.provider,
      email: user.email,
    };
  }
}
