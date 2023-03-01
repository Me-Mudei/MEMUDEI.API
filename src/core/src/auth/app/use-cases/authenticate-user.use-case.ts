import { LoggerInterface, WinstonLogger } from '#shared/infra';
import { UseCase } from '#shared/app';
import { UserRepository } from '../../domain/repository';
import {
  AuthenticateUserInput,
  AuthenticateUserOutput,
  AuthenticateUserOutputMapper,
} from '../dto';
import { AuthGateway } from '../../infra';

export class AuthenticateUserUseCase
  implements UseCase<AuthenticateUserInput, AuthenticateUserOutput>
{
  private logger: LoggerInterface;
  private _userRepository: UserRepository;
  private _authGateway: AuthGateway;
  constructor(authGateway: AuthGateway, userRepository: UserRepository) {
    this.logger = WinstonLogger.getInstance();
    this._userRepository = userRepository;
    this._authGateway = authGateway;
  }

  async execute(input: AuthenticateUserInput): Promise<AuthenticateUserOutput> {
    this.logger.info({ message: 'Start Authenticate User Use Case' });
    const authenticate = await this._authGateway.decodeToken(input.token);
    const user = await this._userRepository.findByEmail(
      authenticate.user.email,
    );
    return AuthenticateUserOutputMapper.toOutput(user);
  }
}
