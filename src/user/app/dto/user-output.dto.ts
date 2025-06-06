export type UserOutput = {
  id: string;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
};

export class UserOutputMapper {
  static toOutput(user: any): UserOutput {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at
    };
  }
}
