import { PaginationOutputDto, SearchInputDto } from "#shared/app";
import { UserFilter } from "#user/domain";

import {
  CreateUserInput,
  UserOutput,
  ValidateUserInput,
  ValidateUserOutput
} from "../dto";
import {
  CreateUserUseCase,
  FindFirstUserUseCase,
  SearchUsersUseCase,
  ValidateUserUseCase
} from "../use-cases";

export interface UserFacadeProps {
  createUseCase: CreateUserUseCase;
  findFirstUseCase: FindFirstUserUseCase;
  searchUseCase: SearchUsersUseCase;
  validateUseCase: ValidateUserUseCase;
}

export class UserFacade {
  private _createUseCase: CreateUserUseCase;
  private _findFirstUseCase: FindFirstUserUseCase;
  private _searchUseCase: SearchUsersUseCase;
  private _validateUseCase: ValidateUserUseCase;

  constructor(readonly props: UserFacadeProps) {
    this._createUseCase = props.createUseCase;
    this._findFirstUseCase = props.findFirstUseCase;
    this._searchUseCase = props.searchUseCase;
    this._validateUseCase = props.validateUseCase;
  }
  async createUser(input: CreateUserInput): Promise<UserOutput> {
    return this._createUseCase.execute(input);
  }

  async findFirstUser(input: SearchInputDto<UserFilter>): Promise<UserOutput> {
    return this._findFirstUseCase.execute(input);
  }

  async searchUsers(
    input: SearchInputDto<UserFilter>
  ): Promise<PaginationOutputDto<UserOutput>> {
    return this._searchUseCase.execute(input);
  }

  async validateUser(input: ValidateUserInput): Promise<ValidateUserOutput> {
    return this._validateUseCase.execute(input);
  }
}
