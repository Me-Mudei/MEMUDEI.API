import {
  CreatePropertyUseCase,
  UpdatePropertyUseCase,
  GetPropertyUseCase,
  SearchPropertyUseCase,
} from '../../../app/use-cases';
import { PropertyFacade } from '../../../app/facade';
import { Broker, ReqLoggerProps, WinstonLogger } from '#shared/infra';
import { InMemoryRepositoryFactory } from '../repository';
import { InMemoryDriver } from '../../driver';

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
    const repositoryFactory = new InMemoryRepositoryFactory();
    const driver = new InMemoryDriver();
    const broker = new Broker();

    const createPropertyUseCase = new CreatePropertyUseCase(
      repositoryFactory,
      driver,
      broker,
    );
    const updatePropertyUseCase = new UpdatePropertyUseCase(
      repositoryFactory,
      driver,
      broker,
    );
    const getPropertyUseCase = new GetPropertyUseCase(
      repositoryFactory,
      broker,
    );
    const searchPropertyUseCase = new SearchPropertyUseCase(
      repositoryFactory,
      broker,
    );

    return new PropertyFacade({
      createProperty: createPropertyUseCase,
      updateProperty: updatePropertyUseCase,
      getProperty: getPropertyUseCase,
      searchProperty: searchPropertyUseCase,
    });
  }
}
