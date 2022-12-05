import { UserFacade } from '../../../app/facade';
import { Broker } from '../#shared/infra/broker';
import { CreateUserUseCase } from '../../../app/use-cases';
import { PrismaRepositoryFactory } from '../repository';
import { UserCreatedSendConfirmationHandler } from '../../../app/handlers';
import { WinstonLogger } from '#sharedogger/winston.logger';

export class PrismaFacadeFactory {
  constructor(readonly req: any) {}
  create() {
    const logger = new WinstonLogger({
      svc: 'testSvc',
      req: {
        req_id: this.req.req_id,
        req_path: this.req.req_path,
        req_method: this.req.req_method,
        req_ua: this.req.req_ua,
      },
    });
    logger.info({ message: 'Start User Service' });
    const repositoryFactory = new PrismaRepositoryFactory();
    const broker = new Broker();

    broker.register(new UserCreatedSendConfirmationHandler());
    const createUserUseCase = new CreateUserUseCase(
      repositoryFactory.createUserRepository(),
      broker,
    );

    return new UserFacade({
      createUseCase: createUserUseCase,
    });
  }
}
