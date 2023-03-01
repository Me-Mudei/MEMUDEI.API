import {
  AuthenticateUserUseCase,
  AuthorizeUserUseCase,
  AuthFacade,
} from '../../app';
import { ReqLoggerProps, WinstonLogger, Connection } from '#shared/infra';
import { UserPrismaRepository } from '../repository';
import { AuthGateway } from '../auth-gateway';

export class PrismaFacadeFactory {
  static create(req: ReqLoggerProps) {
    new WinstonLogger({
      svc: 'testSvc',
      req: {
        req_id: req.req_id,
        req_path: req.req_path,
        req_method: req.req_method,
        req_ua: req.req_ua,
      },
    });
    const prisma = Connection.getInstance();
    const userRepository = new UserPrismaRepository(prisma);
    const authGateway = new AuthGateway();

    const authenticateUserUseCase = new AuthenticateUserUseCase(
      authGateway,
      userRepository,
    );
    const authorizeUserUseCase = new AuthorizeUserUseCase(userRepository);

    return new AuthFacade({
      authenticateUser: authenticateUserUseCase,
      authorizeUser: authorizeUserUseCase,
    });
  }
}
