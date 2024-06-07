export type AuthUserOutput = {
  id: string;
  name: string;
  email: string;
  provider?: string;
  password?: string;
  created_at: Date;
  updated_at: Date;
};

export class AuthUserOutputMapper {
  static toOutput(user: any): AuthUserOutput {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}
