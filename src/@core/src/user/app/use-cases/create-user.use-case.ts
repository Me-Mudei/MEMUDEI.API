import User from "../../domain/entities/user.entity";
import UserCreated from "../../domain/events/user-created.event";
import UserRepository from "../../domain/repository/user.repository";
import Broker from "../../../@shared/infra/broker/broker";
import { CreateUserInput, CreateUserOutput } from "../dto/create-user.dto";
import UseCase from "../../../@shared/app/use-case/use-case";

export default class CreateUser
  implements UseCase<CreateUserInput, CreateUserOutput>
{
  constructor(
    readonly userRepository: UserRepository.Repository,
    readonly broker: Broker
  ) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const user = new User({
      email: input.email,
      name: input.name,
      role_name: input.role_name,
    });
    await this.userRepository.insert(user);
    const output: CreateUserOutput = {
      status: "USER_CREATED",
      message: "User created successfully",
    };
    await this.broker.publish(new UserCreated(user));
    return output;
  }
}
