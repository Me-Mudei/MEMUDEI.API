import { SearchPropertyUseCase } from '../../search-property.use-case';
import { PrismaRepositoryFactory } from '#property/infra';
import { Broker } from '#shared/infra';
import { RepositoryFactory } from '#property/domain';

describe('SearchPropertyUseCase Unit Tests', () => {
  let useCase: SearchPropertyUseCase;
  let repositoryFactory: RepositoryFactory;
  let broker: Broker;

  beforeEach(() => {
    repositoryFactory = new PrismaRepositoryFactory();
    broker = new Broker();
    useCase = new SearchPropertyUseCase(repositoryFactory, broker);
  });

  it('should search a property', async () => {
    const output = await useCase.execute({});
    expect(output).toMatchObject({
      total: 15,
      current_page: 1,
      per_page: 15,
      last_page: 1,
    });
  });
});
