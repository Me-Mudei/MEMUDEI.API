import { GlobalRole } from "#auth/domain";

export type AuthUserOutput = {
  id: string;
  email: string;
  globalRole?: GlobalRole;
};

export class AuthUserOutputMapper {
  static toOutput(user: any): AuthUserOutput {
    return {
      id: user.id,
      email: user.email,
      globalRole: user?.global_role?.name,
    };
  }
}
