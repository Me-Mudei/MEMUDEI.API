import { User, UserCreated, UserRepository } from '../../domain';
import { Broker } from '../../../shared/infra/';
import { CreateUserInput } from '../dto';
import { UseCase } from '../../../shared/app';
import { LoggerInterface } from '../../../shared/infra/logger/logger.interface';
import { WinstonLogger } from '../../../shared/infra/logger/winston.logger';

export class CreateUserUseCase implements UseCase<CreateUserInput, void> {
  logger: LoggerInterface;
  constructor(
    readonly userRepository: UserRepository.Repository,
    readonly broker: Broker,
    logger?: LoggerInterface,
  ) {
    !!logger
      ? (this.logger = logger)
      : (this.logger = new WinstonLogger({
          svc: 'CreateUserUseCase',
          req: {
            req_id: 'test',
            req_path: 'test',
            req_method: 'test',
            req_ua: 'test',
          },
        }));
  }

  async execute(input: CreateUserInput): Promise<void> {
    this.logger.info({ message: 'Start User Use Case' });
    const user = new User({
      email: input.email,
      name: input.name,
      role_name: input.role_name,
    });
    await this.userRepository.insert(user);
    await this.broker.publish(new UserCreated(user));
  }
}
