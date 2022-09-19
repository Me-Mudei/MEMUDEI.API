import Broker from "../@shared/infra/broker/broker";
import PrismaRepositoryFactory from "./infra/factory/PrismaRepositoryFactory";
import UserFacade from "./app/facade/user.facade";
import UserCreatedSendConfirmationHandler from "./app/handlers/user-created-send-confirmation.handler";
import CreateUser from "./app/use-cases/create-user.use-case";

export default class main {
  static create() {
    const repositoryFactory = new PrismaRepositoryFactory();
    const broker = new Broker();

    broker.register(new UserCreatedSendConfirmationHandler());
    const createUserUseCase = new CreateUser(
      repositoryFactory.createUserRepository(),
      broker
    );

    return new UserFacade({
      createUseCase: createUserUseCase,
    });
  }
}
