import { SearchInputDto, UseCase } from '#shared/app';
import { LoggerInterface, WinstonLogger } from '#shared/infra';
import { UserFilter, UserRepository, UserSearchParams } from '../../domain';
import { UserOutput } from '../dto';

export class FindFirstUserUseCase
  implements UseCase<SearchInputDto<UserFilter>, UserOutput>
{
  private logger: LoggerInterface;
  constructor(readonly userRepository: UserRepository) {
    this.logger = WinstonLogger.getInstance();
  }

  async execute(input: SearchInputDto<UserFilter>): Promise<UserOutput> {
    this.logger.info({ message: 'Start User Use Case' });
    const params = new UserSearchParams(input);
    const user = await this.userRepository.findFirst(params);
    if (!user) {
      throw new Error('User not found');
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}
