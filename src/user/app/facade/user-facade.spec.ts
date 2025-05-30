import { Broker } from "#shared/infra";

import { Auth, UserInMemoryRepository } from "../../infra";
import {
  CreateUserUseCase,
  FindFirstUserUseCase,
  SearchUsersUseCase,
  ValidateUserUseCase
} from "../use-cases";

import { UserFacade } from "./user.facade";

describe("UserFacade Unit tests", () => {
  let useCase: CreateUserUseCase;
  let mockFindFirstUser: FindFirstUserUseCase;
  let mockSearchUsers: SearchUsersUseCase;
  let mockValidateUser: ValidateUserUseCase;
  let repository: UserInMemoryRepository;
  let broker: Broker;
  let facade: UserFacade;
  let authService: Auth;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    broker = new Broker();
    authService = {
      signup: jest.fn()
    };
    useCase = new CreateUserUseCase(repository, authService, broker);
    mockFindFirstUser = new FindFirstUserUseCase(repository);
    mockSearchUsers = new SearchUsersUseCase(repository);
    mockValidateUser = new ValidateUserUseCase(repository);
    facade = new UserFacade({
      createUseCase: useCase,
      findFirstUseCase: mockFindFirstUser,
      searchUseCase: mockSearchUsers,
      validateUseCase: mockValidateUser
    });
  });
  it("should create a user facade", async () => {
    const spyFacadeCreate = jest.spyOn(facade, "createUser");
    const spyUseCaseExecute = jest.spyOn(useCase, "execute");
    await facade.createUser({
      name: "Test",
      email: "tes@test.com"
    });
    expect(spyFacadeCreate).toHaveBeenCalledTimes(1);
    expect(spyUseCaseExecute).toHaveBeenCalledTimes(1);
  });
});
