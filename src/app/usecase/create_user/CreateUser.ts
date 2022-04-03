import User from '../../../domain/entity/User';
import UserCreated from '../../../domain/event/UserCreated';
import RepositoryFactory from '../../../domain/factory/RepositoryFactory';
import UserRepository from '../../../domain/repository/UserRepository';
import Broker from '../../../infra/broker/Broker';
import { CreateUserInput, CreateUserOutput } from './ICreateUser';

export default class CreateUser {
  userRepository: UserRepository;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker
  ) {
    this.userRepository = repositoryFactory.createUserRepository();
  }

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const user = new User(input.email, input.name, input.roleName);
    await this.userRepository.create(user);
    const output: CreateUserOutput = {
      status: 'USER_CREATED',
      message: 'User created successfully',
    };
    await this.broker.publish(new UserCreated(user));
    return output;
  }
}
