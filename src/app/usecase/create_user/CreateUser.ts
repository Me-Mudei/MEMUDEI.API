import Address from '../../../domain/entity/Address';
import User from '../../../domain/entity/User';
import UserRepository from '../../../domain/repository/UserRepository';
import BrasilApiValidateCepAdapter from '../../../infra/service/validate_cep/BrasilApiValidateCepAdapter';
import { CreateUserInput, CreateUserOutput } from './ICreateUser';

export default class CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

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
    await address.validatezipCode();
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
    return output;
  }
}
