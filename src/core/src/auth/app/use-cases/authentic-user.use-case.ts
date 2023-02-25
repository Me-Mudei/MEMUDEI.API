import { LoggerInterface, WinstonLogger } from '#shared/infra';
import { UseCase } from '#shared/app';
import {
  AuthenticUserInput,
  AuthenticUserOutput,
  AuthenticUserOutputMapper,
} from '../dto';

export class AuthenticUserUseCase
  implements UseCase<AuthenticUserInput, AuthenticUserOutput>
{
  private logger: LoggerInterface;
  constructor() {
    this.logger = WinstonLogger.getInstance();
  }

  async execute(input: AuthenticUserInput): Promise<AuthenticUserOutput> {
    this.logger.info({ message: 'Start Authentic User Use Case' });
    const authentic = input;
    return AuthenticUserOutputMapper.toOutput(authentic);
  }
}
