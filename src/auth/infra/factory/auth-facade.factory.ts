import { Connection } from "#shared/infra";

import { AuthenticateUserUseCase, AuthFacade } from "../../app";
import { AuthGateway } from "../auth-gateway";
import { UserPrismaRepository } from "../repository";

export class AuthFacadeFactory {
  static create() {
    const prisma = Connection.getInstance();
    const userRepository = new UserPrismaRepository(prisma);
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
