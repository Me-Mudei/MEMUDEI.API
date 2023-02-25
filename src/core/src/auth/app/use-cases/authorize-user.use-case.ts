import { LoggerInterface, WinstonLogger } from '#shared/infra';
import { UseCase } from '#shared/app';
import {
  AuthorizeUserInput,
  AuthorizeUserOutput,
  AuthorizeUserOutputMapper,
} from '../dto';

export class AuthorizeUserUseCase
  implements UseCase<AuthorizeUserInput, AuthorizeUserOutput>
{
  private logger: LoggerInterface;
  constructor() {
    this.logger = WinstonLogger.getInstance();
  }

  async execute(input: AuthorizeUserInput): Promise<AuthorizeUserOutput> {
    this.logger.info({ message: 'Start Authorize User Use Case' });
    const authorize = input;
    return AuthorizeUserOutputMapper.toOutput(authorize);
  }
}
