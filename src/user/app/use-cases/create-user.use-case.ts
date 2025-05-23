import { UseCase } from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";
import { Auth, checkPassword, generatePassword } from "#user/infra";

import { User, UserCreated, UserRepository } from "../../domain";
import { CreateUserInput, UserOutput } from "../dto";

export class CreateUserUseCase implements UseCase<CreateUserInput, UserOutput> {
  private logger: LoggerInterface;
  constructor(
    readonly userRepository: UserRepository,
    readonly authService: Auth,
    readonly broker: Broker
  ) {
    this.logger = WinstonLogger.getInstance();
  }

  async execute(input: CreateUserInput): Promise<UserOutput> {
    this.logger.info({ message: "Start User Use Case" });
    if (input.external_id && input.password) {
      throw new Error("External ID and Password are mutually exclusive");
    }
    let user: User;
    if (input.external_id) {
      user = new User({
        email: input.email,
        name: input.name,
        external_id: input.external_id
      });
    } else {
      if (input.password && !checkPassword(input.password)) {
        throw new Error("Password does not meet requirements");
      }
      user = await this.authService.signup({
        name: input.name,
        email: input.email,
        password: input.password ?? generatePassword()
      });
    }
    await this.userRepository.insert(user);
    await this.broker.publish(new UserCreated(user));
    return user.toJSON();
  }
}
