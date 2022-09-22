import UserFacade from "../../../app/facade/user.facade";
import Broker from "../../../../shared/infra/broker/broker";
import { CreateUserUseCase } from "../../../app/use-cases";
import PrismaRepositoryFactory from "../repository/prisma-repository.factory";
import UserCreatedSendConfirmationHandler from "../../../app/handlers/user-created-send-confirmation.handler";

export class PrismaFacadeFactory {
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
