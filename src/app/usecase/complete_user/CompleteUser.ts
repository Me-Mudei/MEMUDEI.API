import Address from '../../../domain/entity/Address';
import User from '../../../domain/entity/User';
//import UserCompleted from '../../../domain/event/UserCompleted';
import RepositoryFactory from '../../../domain/factory/RepositoryFactory';
import UserRepository from '../../../domain/repository/UserRepository';
import Broker from '../../../infra/broker/Broker';
import BrasilApiValidateCepAdapter from '../../../infra/validate_cep/BrasilApiValidateCepAdapter';
import { CompleteUserInput, CompleteUserOutput } from './ICompleteUser';

export default class CompleteUser {
  userRepository: UserRepository;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker
  ) {
    this.userRepository = repositoryFactory.createUserRepository();
  }

  async execute(input: CompleteUserInput): Promise<CompleteUserOutput> {
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
      input.email,
      input.name,
      input.roleName,
      input.phone,
      new Date(input.born),
      address,
      input.cpf,
      input.description
    );
    await this.userRepository.complete(user);
    const output: CompleteUserOutput = {
      status: 'USER_COMPLETED',
      message: 'User completed successfully',
    };
    //await this.broker.publish(new UserCompleted(user));
    return output;
  }
}
