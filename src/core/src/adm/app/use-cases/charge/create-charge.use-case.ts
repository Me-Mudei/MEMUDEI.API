import { ChargeRepository } from '../../../domain/repository';
import { RepositoryFactory } from '../../../domain/factory';
import { Charge } from '../../../domain/entities';
import { Broker, LoggerInterface, WinstonLogger } from '#shared/infra';
import { CreateChargeInput, ChargeOutput, ChargeOutputMapper } from '../../dto';
import { UseCase } from '#shared/app';

export class CreateChargeUseCase
  implements UseCase<CreateChargeInput, ChargeOutput>
{
  chargeRepository: ChargeRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
  ) {
    this.logger = WinstonLogger.getInstance();
    this.chargeRepository = repositoryFactory.createChargeRepository();
  }

  async execute(input: CreateChargeInput): Promise<ChargeOutput> {
    this.logger.info({ message: 'Start CreateCharge Use Case' });
    const charge = new Charge({
      key: input.key,
      name: input.name,
      description: input.description,
    });
    await this.chargeRepository.insert(charge);
    return ChargeOutputMapper.toOutput(charge);
  }
}
