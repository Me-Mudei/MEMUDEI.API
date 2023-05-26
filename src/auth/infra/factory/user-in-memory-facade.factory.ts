import { AuthenticateUserUseCase, AuthFacade } from '../../app';
import { ReqLoggerProps, WinstonLogger } from '#shared/infra';
import { UserInMemoryRepository } from '../repository';
import { AuthGateway } from '../auth-gateway';

export class UserInMemoryFacadeFactory {
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
