import { GetPropertyUseCase } from '../../get-property.use-case';
import { InMemoryRepositoryFactory } from '#property/infra';
import { Broker } from '#shared/infra';
import { PropertyFakeBuilder, RepositoryFactory } from '#property/domain';
import { NotFoundError, UniqueEntityId } from '#shared/domain';

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
    const id = new UniqueEntityId('9micktlceY2WicUyvJKq3');
    useCase['propertyRepository']['items'] = [
      PropertyFakeBuilder.theProperties(5).build(),
      PropertyFakeBuilder.aProperty().withId(id).build(),
    ];
    const response = await useCase.execute({ id: id.value });
    expect(response.id).toBe(id.value);
    expect(spyRepositoryFindById).toHaveBeenCalledTimes(1);
  });
});
