import { Broker } from '#shared/infra';
import { UserInMemoryRepository } from '../../infra';
import {
  CreateUserUseCase,
  FindFirstUserUseCase,
  SearchUsersUseCase,
} from '../use-cases';
import { UserFacade } from './user.facade';

describe('UserFacade Unit tests', () => {
  let useCase: CreateUserUseCase;
  let mockFindFirstUser: FindFirstUserUseCase;
  let mockSearchUsers: SearchUsersUseCase;
  let repository: UserInMemoryRepository;
  let broker: Broker;
  let facade: UserFacade;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    broker = new Broker();
    useCase = new CreateUserUseCase(repository, broker);
    mockFindFirstUser = new FindFirstUserUseCase(repository);
    mockSearchUsers = new SearchUsersUseCase(repository);
    facade = new UserFacade({
      createUseCase: useCase,
      findFirstUseCase: mockFindFirstUser,
      searchUseCase: mockSearchUsers,
    });
  });
  it('should create a user facade', async () => {
    const spyFacadeCreate = jest.spyOn(facade, 'createUser');
    const spyUseCaseExecute = jest.spyOn(useCase, 'execute');
    await facade.createUser({
      name: 'Test',
      email: 'tes@test.com',
    });
    expect(spyFacadeCreate).toHaveBeenCalledTimes(1);
    expect(spyUseCaseExecute).toHaveBeenCalledTimes(1);
  });
});
