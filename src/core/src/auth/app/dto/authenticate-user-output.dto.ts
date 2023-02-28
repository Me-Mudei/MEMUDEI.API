import { User } from '#auth/domain';

export type AuthenticateUserOutput = {
  id: string;
  email: string;
  role: {
    name: string;
    permissions: string[];
  };
};

export class AuthenticateUserOutputMapper {
  static toOutput(item: User): AuthenticateUserOutput {
    return {
      id: item.id,
      email: item.email,
      role: {
        name: item.role.name,
        permissions: item.role.permissions.map((p: any) => p.name),
      },
    };
  }
}
