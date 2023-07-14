import { CreateUserUseCase } from '../../create-user.use-case';
import { Auth, UserInMemoryRepository } from '#user/infra/';
import { Broker } from '#shared/infra';
import { UserCreatedSendConfirmationHandler } from '../../../handlers';

describe('CreateUserUseCase Unit Tests', () => {
  let useCase: CreateUserUseCase;
  let repository: UserInMemoryRepository;
  let broker: Broker;
  let authService: Auth;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    broker = new Broker();
    authService = {
      signup: jest.fn(),
    };
    broker.register(new UserCreatedSendConfirmationHandler());
    useCase = new CreateUserUseCase(repository, authService, broker);
  });

  it('should create a user', async () => {
    const spyRepositoryInsert = jest.spyOn(repository, 'insert');
    const spyBrokerPublish = jest.spyOn(broker, 'publish');
    await useCase.execute({
      email: 'test@test.com',
      name: 'test',
    });
    expect(spyRepositoryInsert).toHaveBeenCalledTimes(1);
    expect(spyBrokerPublish).toHaveBeenCalledTimes(1);

    await useCase.execute({
      email: 'test@test.com',
      name: 'test',
    });
    expect(spyRepositoryInsert).toHaveBeenCalledTimes(2);
    expect(spyBrokerPublish).toHaveBeenCalledTimes(2);
  });
});
