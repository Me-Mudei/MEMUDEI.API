import { PaginationOutputDto, SearchInputDto } from '#shared/app';
import { UserFilter } from '#user/domain';
import { CreateUserInput, UserOutput } from '../dto';
import {
  CreateUserUseCase,
  FindFirstUserUseCase,
  SearchUsersUseCase,
} from '../use-cases';

export interface UserFacadeProps {
  createUseCase: CreateUserUseCase;
  findFirstUseCase: FindFirstUserUseCase;
  searchUseCase: SearchUsersUseCase;
}

export class UserFacade {
  private _createUseCase: CreateUserUseCase;
  private _findFirstUseCase: FindFirstUserUseCase;
  private _searchUseCase: SearchUsersUseCase;

  constructor(readonly props: UserFacadeProps) {
    this._createUseCase = props.createUseCase;
    this._findFirstUseCase = props.findFirstUseCase;
    this._searchUseCase = props.searchUseCase;
  }
  async createUser(input: CreateUserInput): Promise<UserOutput> {
    return this._createUseCase.execute(input);
  }

  async findFirstUser(input: SearchInputDto<UserFilter>): Promise<UserOutput> {
    return this._findFirstUseCase.execute(input);
  }

  async searchUsers(
    input: SearchInputDto<UserFilter>,
  ): Promise<PaginationOutputDto<UserOutput>> {
    return this._searchUseCase.execute(input);
  }
}
