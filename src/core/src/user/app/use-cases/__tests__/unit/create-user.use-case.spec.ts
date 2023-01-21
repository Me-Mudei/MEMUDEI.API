import { CreateUserUseCase } from '../../create-user.use-case';
import { UserInMemoryRepository } from '../../../../infra/';
import { Broker } from '#shared/infra';
import { UserCreatedSendConfirmationHandler } from '../../../handlers';

describe('CreateUserUseCase Unit Tests', () => {
  let useCase: CreateUserUseCase;
  let repository: UserInMemoryRepository;
  let broker: Broker;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    broker = new Broker();
    broker.register(new UserCreatedSendConfirmationHandler());
    useCase = new CreateUserUseCase(repository, broker);
  });

  it('should create a user', async () => {
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
