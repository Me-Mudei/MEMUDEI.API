import { UserOutput } from "#user/app";

import { SignInInput, SignUpInput, ValidateInput } from "../dto";
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
  async signUp(input: SignUpInput): Promise<UserOutput> {
    return this._signUpUseCase.execute(input);
  }

  async signIn(input: SignInInput): Promise<UserOutput> {
    return this._signInUseCase.execute(input);
  }

  async validate(input: ValidateInput): Promise<UserOutput> {
    return this._validateUseCase.execute(input);
  }
}
