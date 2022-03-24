import Address from '../../../domain/entity/Address';
import User from '../../../domain/entity/User';
import UserCreated from '../../../domain/event/UserCreated';
import RepositoryFactory from '../../../domain/factory/RepositoryFactory';
import UserRepository from '../../../domain/repository/UserRepository';
import Broker from '../../../infra/broker/Broker';
import BrasilApiValidateCepAdapter from '../../../infra/validate_cep/BrasilApiValidateCepAdapter';
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
    const address = new Address(
      new BrasilApiValidateCepAdapter(),
      input.address.street,
      input.address.number,
      input.address.country,
      input.address.zipCode,
      input.address.neighborhood,
      input.address.complement
    );
    await address.validateZipCode();
    const user = new User(
      input.name,
      input.email,
      input.phone,
      new Date(input.born),
      input.gender,
      address,
      input.cpf,
      input.roleName,
      input.password
    );
    await this.userRepository.create(user);
    const output: CreateUserOutput = {
      status: 'USER_CREATED',
      message: 'User created successfully',
    };
    await this.broker.publish(new UserCreated(user));
    return output;
  }
}
