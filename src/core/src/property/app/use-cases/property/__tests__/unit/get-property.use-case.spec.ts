import { GetPropertyUseCase } from '../../get-property.use-case';
import { InMemoryRepositoryFactory } from '#property/infra';
import { LoggerInterface, WinstonLogger, Broker } from '#shared/infra';
import { RepositoryFactory } from '#property/domain';
import { NotFoundError } from '#shared/domain';

describe('GetPropertyUseCase Unit Tests', () => {
  let useCase: GetPropertyUseCase;
  let repositoryFactory: RepositoryFactory;
  let broker: Broker;

  beforeEach(() => {
    repositoryFactory = new InMemoryRepositoryFactory();
    broker = new Broker();
    useCase = new GetPropertyUseCase(repositoryFactory, broker);
  });

  it('should throws error when entity not found', async () => {
    await expect(() => useCase.execute({ id: 'fake id' })).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`),
    );
  });

  it('should get a property', async () => {
    const spyRepositoryFindById = jest.spyOn(
      useCase['propertyRepository'],
      'findById',
    );
    const input = { id: '9micktlceY2WicUyvJKq3' };
    await expect(() => useCase.execute(input)).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID 9micktlceY2WicUyvJKq3`),
    );
    expect(spyRepositoryFindById).toHaveBeenCalledTimes(1);
  });
});
