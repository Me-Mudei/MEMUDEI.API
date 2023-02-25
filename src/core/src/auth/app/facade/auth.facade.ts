import {
  AuthenticUserInput,
  AuthenticUserOutput,
  AuthorizeUserInput,
  AuthorizeUserOutput,
} from '../dto';
import { AuthenticUserUseCase, AuthorizeUserUseCase } from '../use-cases';

export interface AuthFacadeProps {
  authenticUser: AuthenticUserUseCase;
  authorizeUser: AuthorizeUserUseCase;
}

export class AuthFacade {
  private _authenticUser: AuthenticUserUseCase;
  private _authorizeUser: AuthorizeUserUseCase;

  constructor(readonly props: AuthFacadeProps) {
    this._authenticUser = props.authenticUser;
    this._authorizeUser = props.authorizeUser;
  }
  async authentic(input: AuthenticUserInput): Promise<AuthenticUserOutput> {
    return this._authenticUser.execute(input);
  }
  async authorize(input: AuthorizeUserInput): Promise<AuthorizeUserOutput> {
    return this._authorizeUser.execute(input);
  }
}
