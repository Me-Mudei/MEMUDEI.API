export type AuthorizeUserOutput = {
  id: string;
  created_at: Date;
  updated_at: Date;
};

export class AuthorizeUserOutputMapper {
  static toOutput(item: any): AuthorizeUserOutput {
    return {
      id: item.id,
      created_at: item.created_at,
      updated_at: item.updated_at,
    };
  }
}
