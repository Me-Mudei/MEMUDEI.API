import { UserFacade } from '../../app/facade';
import { Broker, Connection } from '#shared/infra';
import { CreateUserUseCase } from '../../app/use-cases';
import { UserCreatedSendConfirmationHandler } from '../../app/handlers';
import { UserPrismaRepository } from '../repository';

export class UserFacadeFactory {
  static create() {
    const prisma = Connection.getInstance();
    const userRepository = new UserPrismaRepository(prisma);
    const broker = new Broker();

    broker.register(new UserCreatedSendConfirmationHandler());
    const createUserUseCase = new CreateUserUseCase(userRepository, broker);

    return new UserFacade({
      createUseCase: createUserUseCase,
    });
  }
}
