import { LoggerInterface, WinstonLogger } from '#shared/infra';
import { UseCase } from '#shared/app';
import { UserRepository } from '../../domain/repository';
import { AuthenticateUserInput, AuthenticateUserOutput } from '../dto';
import { AuthGateway } from '../../infra';

export class AuthenticateUserUseCase
  implements UseCase<AuthenticateUserInput, AuthenticateUserOutput>
{
  private _userRepository: UserRepository;
  private _authGateway: AuthGateway;
  constructor(authGateway: AuthGateway, userRepository: UserRepository) {
    this._userRepository = userRepository;
    this._authGateway = authGateway;
  }

  async execute(input: AuthenticateUserInput): Promise<AuthenticateUserOutput> {
    const authenticate = await this._authGateway.decodeToken(input.token);
    const user = await this._userRepository.findByExternalId(authenticate.sub);
    return {
      permissions: authenticate.permissions,
      user_id: user.id,
    };
  }
}
