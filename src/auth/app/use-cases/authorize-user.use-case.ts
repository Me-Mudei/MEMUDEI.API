import { LoggerInterface, WinstonLogger } from '#shared/infra';
import { UseCase } from '#shared/app';
import { AuthorizeUserInput } from '../dto';
import { UserRepository } from '../../domain';

export class AuthorizeUserUseCase
  implements UseCase<AuthorizeUserInput, boolean>
{
  private logger: LoggerInterface;
  private _userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.logger = WinstonLogger.getInstance();
    this._userRepository = userRepository;
  }

  async execute(input: AuthorizeUserInput): Promise<boolean> {
    this.logger.info({ message: 'Start Authorize User Use Case' });
    return this._userRepository.hasPermission(input.user_id, input.scope);
  }
}
