import { UserFacade } from '../../app/facade';
import { Broker } from '#shared/infra';
import {
  CreateUserUseCase,
  FindFirstUserUseCase,
  SearchUsersUseCase,
  ValidateUserUseCase,
} from '../../app/use-cases';
import { UserCreatedSendConfirmationHandler } from '../../app/handlers';
import { UserInMemoryRepository } from '../repository';
import { Auth0Auth } from '../auth';

export class UserInMemoryFacadeFactory {
  static create() {
    const userRepository = new UserInMemoryRepository();
    const broker = new Broker();
    const authService = new Auth0Auth();

    broker.register(new UserCreatedSendConfirmationHandler());
    const createUserUseCase = new CreateUserUseCase(
      userRepository,
      authService,
      broker,
    );
    const findFirstUserUseCase = new FindFirstUserUseCase(userRepository);
    const searchUserUseCase = new SearchUsersUseCase(userRepository);
    const validateUserUseCase = new ValidateUserUseCase(userRepository);

    return new UserFacade({
      createUseCase: createUserUseCase,
      findFirstUseCase: findFirstUserUseCase,
      searchUseCase: searchUserUseCase,
      validateUseCase: validateUserUseCase,
    });
  }
}
