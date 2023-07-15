import { AuthenticateUserUseCase, AuthFacade } from "../../app";
import { AuthGateway } from "../auth-gateway";
import { UserInMemoryRepository } from "../repository";

export class AuthInMemoryFacadeFactory {
  static create() {
    const userRepository = new UserInMemoryRepository();
    const authGateway = new AuthGateway();

    const authenticateUserUseCase = new AuthenticateUserUseCase(
      authGateway,
      userRepository
    );

    return new AuthFacade({
      authenticateUser: authenticateUserUseCase
    });
  }
}
