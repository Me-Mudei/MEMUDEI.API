import User from "../../domain/entity/user.entity";
import UserCreated from "../../domain/event/user-created.event";
import UserRepository from "../../domain/repository/user.repository";
import Broker from "../../../@shared/infra/broker";
import { CreateUserInput, CreateUserOutput } from "../dto/ICreateUser";

export default class CreateUser {
  constructor(
    readonly userRepository: UserRepository,
    readonly broker: Broker
  ) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const user = new User(input.email, input.name, input.roleName);
    await this.userRepository.create(user);
    const output: CreateUserOutput = {
      status: "USER_CREATED",
      message: "User created successfully",
    };
    await this.broker.publish(new UserCreated(user));
    return output;
  }
}
