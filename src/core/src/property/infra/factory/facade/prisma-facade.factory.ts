import { PropertyFacade } from '../../../app/facade';
import { Broker } from '../../../../shared/infra/broker';
import { CreatePropertyUseCase } from '../../../app/use-cases';
import { PrismaRepositoryFactory } from '../repository';
import { PropertyCreatedSendConfirmationHandler } from '../../../app/handlers';
import { WinstonLogger } from '../../../../shared/infra/logger/winston.logger';

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
    logger.info({ message: 'Start Property Service' });
    const repositoryFactory = new PrismaRepositoryFactory();
    const broker = new Broker();

    broker.register(new PropertyCreatedSendConfirmationHandler());
    const createPropertyUseCase = new CreatePropertyUseCase(
      repositoryFactory,
      broker,
      logger,
    );

    return new PropertyFacade({
      createUseCase: createPropertyUseCase,
    });
  }
}
