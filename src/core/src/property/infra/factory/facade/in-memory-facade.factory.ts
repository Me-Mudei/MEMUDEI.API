import { PropertyFacade } from '../../../app/facade';
import { Broker } from '../../../../shared/infra';
import { CreatePropertyUseCase } from '../../../app/use-cases';
import { InMemoryRepositoryFactory } from '../repository';
import { PropertyCreatedSendConfirmationHandler } from '../../../app/handlers';
import { WinstonLogger } from '../../../../shared/infra/logger/winston.logger';
import { ReqLoggerProps } from '../../../../shared/infra/logger/logger.interface';

export class InMemoryFacadeFactory {
  constructor(readonly req: ReqLoggerProps) {}
  create() {
    const logger = new WinstonLogger({
      svc: 'property-service',
      req: {
        req_id: this.req.req_id,
        req_path: this.req.req_path,
        req_method: this.req.req_method,
        req_ua: this.req.req_ua,
      },
    });
    const repositoryFactory = new InMemoryRepositoryFactory();
    const broker = new Broker();

    broker.register(new PropertyCreatedSendConfirmationHandler());
    const createPropertyUseCase = new CreatePropertyUseCase(
      repositoryFactory.createPropertyRepository(),
      broker,
      logger,
    );

    return new PropertyFacade({
      createUseCase: createPropertyUseCase,
    });
  }
}
