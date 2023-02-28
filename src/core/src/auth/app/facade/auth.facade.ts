import {
  AuthenticateUserInput,
  AuthenticateUserOutput,
  AuthorizeUserInput,
  AuthorizeUserOutput,
} from '../dto';
import { AuthenticateUserUseCase, AuthorizeUserUseCase } from '../use-cases';

export interface AuthFacadeProps {
  authenticateUser: AuthenticateUserUseCase;
  authorizeUser: AuthorizeUserUseCase;
}

export class AuthFacade {
  private _authenticateUser: AuthenticateUserUseCase;
  private _authorizeUser: AuthorizeUserUseCase;

  constructor(readonly props: AuthFacadeProps) {
    this._authenticateUser = props.authenticateUser;
    this._authorizeUser = props.authorizeUser;
  }
  async authenticate(
    input: AuthenticateUserInput,
  ): Promise<AuthenticateUserOutput> {
    return this._authenticateUser.execute(input);
  }
  async authorize(input: AuthorizeUserInput): Promise<AuthorizeUserOutput> {
    return this._authorizeUser.execute(input);
  }
}
