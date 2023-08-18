import { Broker, Connection } from "#shared/infra";

import { UserFacade } from "../../app/facade";
import { UserCreatedSendToCrmHandler } from "../../app/handlers";
import {
  CreateUserUseCase,
  FindFirstUserUseCase,
  SearchUsersUseCase,
  ValidateUserUseCase
} from "../../app/use-cases";
import { Auth0Auth } from "../auth";
import { UserPrismaRepository } from "../repository";

export class UserFacadeFactory {
  static create() {
    const prisma = Connection.getInstance();
    const userRepository = new UserPrismaRepository(prisma);
    const broker = new Broker();
    const authService = new Auth0Auth();

    broker.register(new UserCreatedSendToCrmHandler());
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
