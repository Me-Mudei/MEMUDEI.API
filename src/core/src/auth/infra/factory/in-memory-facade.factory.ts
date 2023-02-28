import {
  AuthenticateUserUseCase,
  AuthorizeUserUseCase,
} from '#auth/app/use-cases';
import { AuthFacade } from '#auth/app/facade';
import { ReqLoggerProps, WinstonLogger } from '#shared/infra';
import { UserInMemoryRepository } from '../repository';

export class InMemoryFacadeFactory {
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
    const userRepository = new UserInMemoryRepository();
    const authGateway = {} as any;

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
