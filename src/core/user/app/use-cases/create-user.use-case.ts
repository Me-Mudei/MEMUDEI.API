import User from "../../domain/entities/user.entity";
import UserCreated from "../../domain/events/user-created.event";
import UserRepository from "../../domain/repository/user.repository";
import Broker from "../../../shared/infra/broker/broker";
import { CreateUserInput } from "../dto/create-user.dto";
import UseCase from "../../../shared/app/use-case/use-case";

export class CreateUserUseCase implements UseCase<CreateUserInput, void> {
  constructor(
    readonly userRepository: UserRepository.Repository,
    readonly broker: Broker
  ) {}

  async execute(input: CreateUserInput): Promise<void> {
    const user = new User({
      email: input.email,
      name: input.name,
      role_name: input.role_name,
    });
    await this.userRepository.insert(user);
    await this.broker.publish(new UserCreated(user));
  }
}
