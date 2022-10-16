import { Broker } from '../../../shared/infra';
import { PropertyInMemoryRepository } from '../../infra';
import { CreatePropertyUseCase } from '../use-cases';
import { PropertyFacade } from './property.facade';

describe('PropertyFacade Unit tests', () => {
  let useCase: CreatePropertyUseCase;
  let repository: PropertyInMemoryRepository;
  let broker: Broker;
  let facade: PropertyFacade;

  beforeEach(() => {
    repository = new PropertyInMemoryRepository();
    broker = new Broker();
    useCase = new CreatePropertyUseCase(repository, broker);
    facade = new PropertyFacade({ createUseCase: useCase });
  });
  it('should create a property facade', async () => {
    const spyFacadeCreate = jest.spyOn(facade, 'createProperty');
    const spyUseCaseExecute = jest.spyOn(useCase, 'execute');
    await facade.createProperty({
      name: 'Test',
      email: 'tes@test.com',
      role_name: 'TEST',
    });
    expect(spyFacadeCreate).toHaveBeenCalledTimes(1);
    expect(spyUseCaseExecute).toHaveBeenCalledTimes(1);
  });
});
