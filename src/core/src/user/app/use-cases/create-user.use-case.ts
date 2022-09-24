import { User, UserCreated, UserRepository } from "../../domain";
import { Broker } from "../../../shared/infra/";
import { CreateUserInput } from "../dto";
import { UseCase } from "../../../shared/app";

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
