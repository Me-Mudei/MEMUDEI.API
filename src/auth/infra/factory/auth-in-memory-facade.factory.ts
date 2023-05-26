import { AuthenticateUserUseCase, AuthFacade } from '../../app';
import { UserInMemoryRepository } from '../repository';
import { AuthGateway } from '../auth-gateway';

export class AuthInMemoryFacadeFactory {
  static create() {
    const userRepository = new UserInMemoryRepository();
    const authGateway = new AuthGateway();

    const authenticateUserUseCase = new AuthenticateUserUseCase(
      authGateway,
      userRepository,
    );

    return new AuthFacade({
      authenticateUser: authenticateUserUseCase,
    });
  }
}
