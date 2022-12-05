import { GetPropertyUseCase } from '../../get-property.use-case';
import { PrismaRepositoryFactory } from '../../../../infra';
import {
  LoggerInterface,
  WinstonLogger,
  Broker,
} from '../../#shared/infra';
import { RepositoryFactory } from '../../../../domain';
import { NotFoundError } from '../#shared;

describe('GetPropertyUseCase Unit Tests', () => {
  let useCase: GetPropertyUseCase;
  let repositoryFactory: RepositoryFactory;
  let broker: Broker;
  let logger: LoggerInterface;

  beforeEach(() => {
    repositoryFactory = new PrismaRepositoryFactory();
    broker = new Broker();
    logger = new WinstonLogger({
      svc: 'GetUserUseCase',
      req: {
        req_id: 'test',
        req_path: 'test',
        req_method: 'test',
        req_ua: 'test',
      },
    });
    useCase = new GetPropertyUseCase(repositoryFactory, broker, logger);
  });

  it('should throws error when entity not found', async () => {
    await expect(() => useCase.execute({ id: 'fake id' })).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`),
    );
  });

  it('should create a property', async () => {
    const spyRepositoryFindById = jest.spyOn(
      useCase.propertyRepository,
      'findById',
    );
    const input = { id: '9micktlceY2WicUyvJKq3' };
    const property = await useCase.execute(input);

    expect(property).toMatchObject(input);
    expect(spyRepositoryFindById).toHaveBeenCalledTimes(1);
  });
});
