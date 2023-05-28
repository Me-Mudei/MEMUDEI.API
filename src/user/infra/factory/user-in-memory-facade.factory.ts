import { UserFacade } from '../../app/facade';
import { Broker } from '#shared/infra';
import {
  CreateUserUseCase,
  FindFirstUserUseCase,
  SearchUsersUseCase,
} from '../../app/use-cases';
import { UserCreatedSendConfirmationHandler } from '../../app/handlers';
import { UserInMemoryRepository } from '../repository';

export class UserInMemoryFacadeFactory {
  static create() {
    const userRepository = new UserInMemoryRepository();
    const broker = new Broker();

    broker.register(new UserCreatedSendConfirmationHandler());
    const createUserUseCase = new CreateUserUseCase(userRepository, broker);
    const findFirstUserUseCase = new FindFirstUserUseCase(userRepository);
    const searchUserUseCase = new SearchUsersUseCase(userRepository);

    return new UserFacade({
      createUseCase: createUserUseCase,
      findFirstUseCase: findFirstUserUseCase,
      searchUseCase: searchUserUseCase,
    });
  }
}
