import { User } from '../../domain';

export type AuthenticateUserOutput = {
  id: string;
  role: {
    name: string;
  };
};

export class AuthenticateUserOutputMapper {
  static toOutput(item: User): AuthenticateUserOutput {
    return {
      id: item.id,
      role: {
        name: item.role.name,
      },
    };
  }
}
