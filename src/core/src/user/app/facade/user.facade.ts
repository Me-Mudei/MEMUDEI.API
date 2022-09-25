import { CreateUserUseCase } from '../use-cases';

export interface UserFacadeProps {
  createUseCase: CreateUserUseCase;
}

export type CreateUserFacadeInput = {
  name: string;
  email: string;
  role_name: string;
};

export class UserFacade {
  private _createUseCase: CreateUserUseCase;

  constructor(readonly props: UserFacadeProps) {
    this._createUseCase = props.createUseCase;
  }
  async createUser(input: CreateUserFacadeInput): Promise<void> {
    await this._createUseCase.execute(input);
  }
}
