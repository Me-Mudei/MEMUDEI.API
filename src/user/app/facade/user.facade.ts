import { UserOutput } from '../dto';
import { CreateUserUseCase } from '../use-cases';

export interface UserFacadeProps {
  createUseCase: CreateUserUseCase;
}

export type CreateUserFacadeInput = {
  name: string;
  email: string;
  role_name: string;
};

export type UserFacadeOutput = {
  id: string;
  name: string;
  email: string;
  role_name: string;
  created_at: Date;
  updated_at: Date;
};

export class UserFacade {
  private _createUseCase: CreateUserUseCase;

  constructor(readonly props: UserFacadeProps) {
    this._createUseCase = props.createUseCase;
  }
  async createUser(input: CreateUserFacadeInput): Promise<UserFacadeOutput> {
    return this._createUseCase.execute(input);
  }
}
