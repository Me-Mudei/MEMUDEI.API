import Broker from "../@shared/infra/broker/broker";
import PrismaRepositoryFactory from "./infra/factory/prisma-repository.factory";
import UserFacade from "./app/facade/user.facade";
import UserCreatedSendConfirmationHandler from "./app/handlers/user-created-send-confirmation.handler";
import CreateUserUseCase from "./app/use-cases/create-user.use-case";

export default class main {
  static create() {
    const repositoryFactory = new PrismaRepositoryFactory();
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
