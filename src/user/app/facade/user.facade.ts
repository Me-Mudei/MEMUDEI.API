import { CreateUserInput, UserOutput } from '../dto';
import { CreateUserUseCase } from '../use-cases';

export interface UserFacadeProps {
  createUseCase: CreateUserUseCase;
}

export class UserFacade {
  private _createUseCase: CreateUserUseCase;

  constructor(readonly props: UserFacadeProps) {
    this._createUseCase = props.createUseCase;
  }
  async createUser(input: CreateUserInput): Promise<UserOutput> {
    return this._createUseCase.execute(input);
  }
}
