import { UserFacade } from '../../../app/facade';
import { Broker } from '../../../../shared/infra/broker';
import { CreateUserUseCase } from '../../../app/use-cases';
import { PrismaRepositoryFactory } from '../repository';
import { UserCreatedSendConfirmationHandler } from '../../../app/handlers';

export class PrismaFacadeFactory {
  static create() {
    const repositoryFactory = new PrismaRepositoryFactory();
    const broker = new Broker();

    broker.register(new UserCreatedSendConfirmationHandler());
    const createUserUseCase = new CreateUserUseCase(
      repositoryFactory.createUserRepository(),
      broker,
    );

    return new UserFacade({
      createUseCase: createUserUseCase,
    });
  }
}
