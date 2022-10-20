import { SearchPropertyUseCase } from '../../search-property.use-case';
import { PrismaRepositoryFactory } from '../../../../infra';
import {
  LoggerInterface,
  WinstonLogger,
  Broker,
} from '../../../../../shared/infra';
import { RepositoryFactory } from '../../../../domain';

describe('SearchPropertyUseCase Unit Tests', () => {
  let useCase: SearchPropertyUseCase;
  let repositoryFactory: RepositoryFactory;
  let broker: Broker;
  let logger: LoggerInterface;

  beforeEach(() => {
    repositoryFactory = new PrismaRepositoryFactory();
    broker = new Broker();
    logger = new WinstonLogger({
      svc: 'SearchUserUseCase',
      req: {
        req_id: 'test',
        req_path: 'test',
        req_method: 'test',
        req_ua: 'test',
      },
    });
    useCase = new SearchPropertyUseCase(repositoryFactory, broker, logger);
  });

  it('should create a property', async () => {
    const output = await useCase.execute({});

    expect(output).toMatchObject({
      total: 15,
      current_page: 1,
      per_page: 15,
      last_page: 1,
    });
  });
});
