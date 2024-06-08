import {
  SignInInput,
  SignUpInput,
  ValidateInput,
  AuthUserOutput,
} from "../dto";
import { SignUpUseCase, SignInUseCase, ValidateUseCase } from "../use-cases";

export interface AuthFacadeProps {
  signUpUseCase: SignUpUseCase;
  signInUseCase: SignInUseCase;
  validateUseCase: ValidateUseCase;
}

export class AuthFacade {
  private _signUpUseCase: SignUpUseCase;
  private _signInUseCase: SignInUseCase;
  private _validateUseCase: ValidateUseCase;

  constructor(readonly props: AuthFacadeProps) {
    this._signUpUseCase = props.signUpUseCase;
    this._signInUseCase = props.signInUseCase;
    this._validateUseCase = props.validateUseCase;
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
