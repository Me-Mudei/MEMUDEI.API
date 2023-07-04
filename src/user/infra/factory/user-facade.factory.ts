import { UserFacade } from '../../app/facade';
import { Broker, Connection } from '#shared/infra';
import {
  CreateUserUseCase,
  FindFirstUserUseCase,
  SearchUsersUseCase,
  ValidateUserUseCase,
} from '../../app/use-cases';
import { UserCreatedSendConfirmationHandler } from '../../app/handlers';
import { UserPrismaRepository } from '../repository';

export class UserFacadeFactory {
  static create() {
    const prisma = Connection.getInstance();
    const userRepository = new UserPrismaRepository(prisma);
    const broker = new Broker();

    broker.register(new UserCreatedSendConfirmationHandler());
    const createUserUseCase = new CreateUserUseCase(userRepository, broker);
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
