import { CreatePropertyUseCase } from '../../create-property.use-case';
import { PropertyInMemoryRepository } from '../../../../infra/';
import { Broker } from '../../../../../shared/infra/broker/broker';
import { PropertyCreatedSendConfirmationHandler } from '../../../handlers';

describe('CreatePropertyUseCase Unit Tests', () => {
  let useCase: CreatePropertyUseCase;
  let repository: PropertyInMemoryRepository;
  let broker: Broker;

  beforeEach(() => {
    repository = new PropertyInMemoryRepository();
    broker = new Broker();
    broker.register(new PropertyCreatedSendConfirmationHandler());
    useCase = new CreatePropertyUseCase(repository, broker);
  });

  it('should create a property', async () => {
    const spyRepositoryInsert = jest.spyOn(repository, 'insert');
    const spyBrokerPublish = jest.spyOn(broker, 'publish');
    await useCase.execute({
      email: 'test@test.com',
      name: 'test',
      role_name: 'TEST',
    });
    expect(spyRepositoryInsert).toHaveBeenCalledTimes(1);
    expect(spyBrokerPublish).toHaveBeenCalledTimes(1);

    await useCase.execute({
      email: 'test@test.com',
      name: 'test',
      role_name: 'TEST',
    });
    expect(spyRepositoryInsert).toHaveBeenCalledTimes(2);
    expect(spyBrokerPublish).toHaveBeenCalledTimes(2);
  });
});
