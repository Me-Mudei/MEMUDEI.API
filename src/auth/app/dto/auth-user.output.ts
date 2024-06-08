import { AuthProvider } from "#auth/domain";

export type AuthUserOutput = {
  id: string;
  provider: AuthProvider;
  email: string;
  created_at: Date;
  updated_at: Date;
};

export class AuthUserOutputMapper {
  static toOutput(user: any): AuthUserOutput {
    return {
      id: user.id,
      provider: user.provider,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}
