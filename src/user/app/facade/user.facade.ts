import { PaginationOutputDto, SearchInputDto } from "#shared/app";

import { UserFilter } from "../../domain";
import { UserOutput } from "../dto";
import { SearchUsersUseCase, FindFirstUserUseCase } from "../use-cases";

export interface UserFacadeProps {
  searchUseCase: SearchUsersUseCase;
  findFirstUseCase: FindFirstUserUseCase;
}

export class UserFacade {
  private _searchUseCase: SearchUsersUseCase;
  private _findFirstUseCase: FindFirstUserUseCase;

  constructor(readonly props: UserFacadeProps) {
    this._searchUseCase = props.searchUseCase;
    this._findFirstUseCase = props.findFirstUseCase;
  }

  async searchUsers(
    input: SearchInputDto<UserFilter>,
  ): Promise<PaginationOutputDto<UserOutput>> {
    return this._searchUseCase.execute(input);
  }

  async findFirstUsers(input: SearchInputDto<UserFilter>): Promise<UserOutput> {
    return this._findFirstUseCase.execute(input);
  }
}
