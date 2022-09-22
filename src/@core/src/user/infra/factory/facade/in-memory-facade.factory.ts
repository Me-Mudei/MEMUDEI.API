import UserFacade from "../../../app/facade/user.facade";
import Broker from "../../../../@shared/infra/broker/broker";
import { CreateUserUseCase } from "../../../app/use-cases";
import InMemoryRepositoryFactory from "../repository/in-memory-repository.factory";
import UserCreatedSendConfirmationHandler from "../../../app/handlers/user-created-send-confirmation.handler";

export class InMemoryFacadeFactory {
  static create() {
    const repositoryFactory = new InMemoryRepositoryFactory();
    const broker = new Broker();

    broker.register(new UserCreatedSendConfirmationHandler());
    const createUserUseCase = new CreateUserUseCase(
      repositoryFactory.createUserRepository(),
      broker
    );

    return new UserFacade({
      createUseCase: createUserUseCase,
    });
  }
}
