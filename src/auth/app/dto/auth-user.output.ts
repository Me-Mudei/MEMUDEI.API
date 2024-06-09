export type AuthUserOutput = {
  id: string;
  email: string;
};

export class AuthUserOutputMapper {
  static toOutput(user: any): AuthUserOutput {
    return {
      id: user.id,
      email: user.email,
    };
  }
}
