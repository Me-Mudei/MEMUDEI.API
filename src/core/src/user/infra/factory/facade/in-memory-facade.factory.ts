import { UserFacade } from '../../../app/facade';
import { Broker } from '../#shared/infra';
import { CreateUserUseCase } from '../../../app/use-cases';
import { InMemoryRepositoryFactory } from '../repository';
import { UserCreatedSendConfirmationHandler } from '../../../app/handlers';
import { WinstonLogger } from '#sharedogger/winston.logger';
import { ReqLoggerProps } from '#sharedogger/logger.interface';

export class InMemoryFacadeFactory {
  constructor(readonly req: ReqLoggerProps) {}
  create() {
    const logger = new WinstonLogger({
      svc: 'user-service',
      req: {
        req_id: this.req.req_id,
        req_path: this.req.req_path,
        req_method: this.req.req_method,
        req_ua: this.req.req_ua,
      },
    });
    const repositoryFactory = new InMemoryRepositoryFactory();
    const broker = new Broker();

    broker.register(new UserCreatedSendConfirmationHandler());
    const createUserUseCase = new CreateUserUseCase(
      repositoryFactory.createUserRepository(),
      broker,
      logger,
    );

    return new UserFacade({
      createUseCase: createUserUseCase,
    });
  }
}
