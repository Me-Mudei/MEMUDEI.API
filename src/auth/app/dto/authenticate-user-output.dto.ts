import { Session } from '#auth/infra';

export type AuthenticateUserOutput = {
  permissions: string[];
};

export class AuthenticateUserOutputMapper {
  static toOutput(session: Session): AuthenticateUserOutput {
    return {
      permissions: session.permissions,
    };
  }
}
