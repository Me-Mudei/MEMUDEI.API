import { User, UserCreated, UserRepository } from '../../domain';

import { CreateUserInput, UserOutput } from '../dto';
import { UseCase } from '#shared/app';
import { Broker, LoggerInterface, WinstonLogger } from '#shared/infra';

export class CreateUserUseCase implements UseCase<CreateUserInput, UserOutput> {
  private logger: LoggerInterface;
  constructor(
    readonly userRepository: UserRepository,
    readonly broker: Broker,
  ) {
    this.logger = WinstonLogger.getInstance();
  }

  async execute(input: CreateUserInput): Promise<UserOutput> {
    this.logger.info({ message: 'Start User Use Case' });
    const user = new User({
      email: input.email,
      name: input.name,
      external_id: input.external_id,
    });
    await this.userRepository.insert(user);
    await this.broker.publish(new UserCreated(user));
    return user.toJSON();
  }
}
