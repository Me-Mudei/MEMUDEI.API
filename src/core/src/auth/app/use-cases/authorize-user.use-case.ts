import { LoggerInterface, WinstonLogger } from '#shared/infra';
import { UseCase } from '#shared/app';
import {
  AuthorizeUserInput,
  AuthorizeUserOutput,
  AuthorizeUserOutputMapper,
} from '../dto';
import { UserRepository } from '#auth/domain';

export class AuthorizeUserUseCase
  implements UseCase<AuthorizeUserInput, AuthorizeUserOutput>
{
  private logger: LoggerInterface;
  private _userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.logger = WinstonLogger.getInstance();
    this._userRepository = userRepository;
  }

  async execute(input: AuthorizeUserInput): Promise<AuthorizeUserOutput> {
    this.logger.info({ message: 'Start Authorize User Use Case' });
    const authorize = input;
    return AuthorizeUserOutputMapper.toOutput(authorize);
  }
}
