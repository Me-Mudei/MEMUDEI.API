import { UseCase } from "#shared/app";

import { UserRepository } from "../../domain/repository";
import { AuthGateway, Session } from "../../infra";
import { AuthenticateUserInput, AuthenticateUserOutput } from "../dto";

export class AuthenticateUserUseCase
  implements UseCase<AuthenticateUserInput, AuthenticateUserOutput>
{
  private _userRepository: UserRepository;
  private _authGateway: AuthGateway;
  constructor(authGateway: AuthGateway, userRepository: UserRepository) {
    this._userRepository = userRepository;
    this._authGateway = authGateway;
  }

  async execute(input: AuthenticateUserInput): Promise<AuthenticateUserOutput> {
    const authenticate = await new Promise<Session>((resolve, reject) => {
      this._authGateway.decodeToken(input.token, (err, decoded) => {
        if (err) reject(err);
        if (decoded) resolve(decoded);
      });
    });
    const user = await this._userRepository.findByExternalId(authenticate.sub);
    return {
      permissions: authenticate.permissions,
      user_id: user.id
    };
  }
}
