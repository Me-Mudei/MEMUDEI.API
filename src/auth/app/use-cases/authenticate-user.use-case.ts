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
    console.log("START:AuthenticateUserUseCase");
    let authenticate: Session;
    this._authGateway.decodeToken(input.token, (err, decoded) => {
      console.log("START:AuthenticateUserUseCase.decodeToken");
      console.log("err", err);
      console.log("decoded", decoded);
      authenticate = decoded;
      console.log("END:AuthenticateUserUseCase.decodeToken");
    });
    if (!authenticate) throw new Error("Invalid token");
    const user = await this._userRepository.findByExternalId(authenticate.sub);
    console.log("user", user);
    console.log("END:AuthenticateUserUseCase");
    return {
      permissions: authenticate.permissions,
      user_id: user.id
    };
  }
}
