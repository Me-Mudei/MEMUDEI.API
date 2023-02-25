export type AuthenticUserOutput = {
  id: string;
  created_at: Date;
  updated_at: Date;
};

export class AuthenticUserOutputMapper {
  static toOutput(item: any): AuthenticUserOutput {
    return {
      id: item.id,
      created_at: item.created_at,
      updated_at: item.updated_at,
    };
  }
}
