import { AuthenticateUserInput, AuthenticateUserOutput } from "../dto";
import { AuthenticateUserUseCase } from "../use-cases";

export interface AuthFacadeProps {
  authenticateUser: AuthenticateUserUseCase;
}

export class AuthFacade {
  private _authenticateUser: AuthenticateUserUseCase;

  constructor(readonly props: AuthFacadeProps) {
    this._authenticateUser = props.authenticateUser;
  }
  async authenticate(
    input: AuthenticateUserInput
  ): Promise<AuthenticateUserOutput> {
    return this._authenticateUser.execute(input);
  }
}
