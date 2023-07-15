import { Broker } from "#shared/infra";

import { UserFacade } from "../../app/facade";
import { UserCreatedSendConfirmationHandler } from "../../app/handlers";
import {
  CreateUserUseCase,
  FindFirstUserUseCase,
  SearchUsersUseCase,
  ValidateUserUseCase
} from "../../app/use-cases";
import { Auth0Auth } from "../auth";
import { UserInMemoryRepository } from "../repository";

export class UserInMemoryFacadeFactory {
  static create() {
    const userRepository = new UserInMemoryRepository();
    const broker = new Broker();
    const authService = new Auth0Auth();

    broker.register(new UserCreatedSendConfirmationHandler());
    const createUserUseCase = new CreateUserUseCase(
      userRepository,
      authService,
      broker
    );
    const findFirstUserUseCase = new FindFirstUserUseCase(userRepository);
    const searchUserUseCase = new SearchUsersUseCase(userRepository);
    const validateUserUseCase = new ValidateUserUseCase(userRepository);

    return new UserFacade({
      createUseCase: createUserUseCase,
      findFirstUseCase: findFirstUserUseCase,
      searchUseCase: searchUserUseCase,
      validateUseCase: validateUserUseCase
    });
  }
}
