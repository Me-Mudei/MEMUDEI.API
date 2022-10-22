import { PropertyFacade } from '../../../app/facade';
import { Broker } from '../../../../shared/infra/broker';
import {
  CreatePropertyUseCase,
  GetPropertyUseCase,
  SearchPropertyUseCase,
} from '../../../app/use-cases';
import { PrismaRepositoryFactory } from '../repository';
import { WinstonLogger } from '../../../../shared/infra/logger/winston.logger';
import { AwsS3Driver, InMemoryDriver } from '../../driver';

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
    const repositoryFactory = new PrismaRepositoryFactory();
    //const driver = new AwsS3Driver();
    const driver = new InMemoryDriver();
    const broker = new Broker();

    const createPropertyUseCase = new CreatePropertyUseCase(
      repositoryFactory,
      driver,
      broker,
      logger,
    );
    const getPropertyUseCase = new GetPropertyUseCase(
      repositoryFactory,
      broker,
      logger,
    );
    const searchPropertyUseCase = new SearchPropertyUseCase(
      repositoryFactory,
      broker,
      logger,
    );

    return new PropertyFacade({
      createUseCase: createPropertyUseCase,
      getUseCase: getPropertyUseCase,
      searchUseCase: searchPropertyUseCase,
    });
  }
}
