import { User, UserRepository, UserSearchParams } from '../../domain';

import { ValidateUserInput, ValidateUserOutput } from '../dto';
import { UseCase } from '#shared/app';
import { LoggerInterface, WinstonLogger } from '#shared/infra';

export class ValidateUserUseCase
  implements UseCase<ValidateUserInput, ValidateUserOutput>
{
  private logger: LoggerInterface;
  constructor(readonly userRepository: UserRepository) {
    this.logger = WinstonLogger.getInstance();
  }

  async execute(input: ValidateUserInput): Promise<ValidateUserOutput> {
    this.logger.info({ message: 'Start User Use Case' });
    const user = await this.userRepository.findFirst(
      new UserSearchParams({
        filter: { email: input.email },
      }),
    );
    return {
      already_exists: !!user,
    };
  }
}
