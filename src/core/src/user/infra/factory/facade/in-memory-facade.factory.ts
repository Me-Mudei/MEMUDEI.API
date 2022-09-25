import { UserFacade } from '../../../app/facade';
import { Broker } from '../../../../shared/infra';
import { CreateUserUseCase } from '../../../app/use-cases';
import { InMemoryRepositoryFactory } from '../repository';
import { UserCreatedSendConfirmationHandler } from '../../../app/handlers';

export class InMemoryFacadeFactory {
  static create() {
    const repositoryFactory = new InMemoryRepositoryFactory();
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
