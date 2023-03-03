import {
  CreatePropertyUseCase,
  GetPropertyUseCase,
  SearchPropertyUseCase,
} from '../../../app/use-cases';
import { PropertyFacade } from '../../../app/facade';
import { Broker, WinstonLogger, ReqLoggerProps } from '#shared/infra';
import { PrismaRepositoryFactory } from '../repository';
import { AwsS3Driver } from '../../driver';

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
    const repositoryFactory = new PrismaRepositoryFactory();
    const driver = new AwsS3Driver();
    const broker = new Broker();

    const createPropertyUseCase = new CreatePropertyUseCase(
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
      getProperty: getPropertyUseCase,
      searchProperty: searchPropertyUseCase,
    });
  }
}
