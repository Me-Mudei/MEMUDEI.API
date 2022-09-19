import UseCase from "../../../@shared/app/use-case/use-case";
import { CreateUserFacadeInput } from "../dto/create-user-facade.dto";

export interface UserFacadeProps {
  createUseCase: UseCase;
}

export default class UserFacade {
  private _createUseCase: UseCase;

  constructor(readonly props: UserFacadeProps) {
    this._createUseCase = props.createUseCase;
  }
  async create_user(input: CreateUserFacadeInput): Promise<void> {
    await this._createUseCase.execute(input);
  }
}
