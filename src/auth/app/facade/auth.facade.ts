import {
  SignInInput,
  SignUpInput,
  ValidateInput,
  AuthUserOutput,
  AuthorizeInput,
} from "../dto";
import {
  SignUpUseCase,
  SignInUseCase,
  ValidateUseCase,
  AuthorizeUseCase,
} from "../use-cases";

export interface AuthFacadeProps {
  authorizeUseCase: AuthorizeUseCase;
  signUpUseCase: SignUpUseCase;
  signInUseCase: SignInUseCase;
  validateUseCase: ValidateUseCase;
}

export class AuthFacade {
  private _authorizeUseCase: AuthorizeUseCase;
  private _signUpUseCase: SignUpUseCase;
  private _signInUseCase: SignInUseCase;
  private _validateUseCase: ValidateUseCase;

  constructor(readonly props: AuthFacadeProps) {
    this._authorizeUseCase = props.authorizeUseCase;
    this._signUpUseCase = props.signUpUseCase;
    this._signInUseCase = props.signInUseCase;
    this._validateUseCase = props.validateUseCase;
  }

  async authorize(input: AuthorizeInput): Promise<boolean> {
    return this._authorizeUseCase.execute(input);
  }

  async signUp(input: SignUpInput): Promise<AuthUserOutput> {
    return this._signUpUseCase.execute(input);
  }

  async signIn(input: SignInInput): Promise<AuthUserOutput> {
    return this._signInUseCase.execute(input);
  }

  async validate(input: ValidateInput): Promise<AuthUserOutput> {
    return this._validateUseCase.execute(input);
  }
}
