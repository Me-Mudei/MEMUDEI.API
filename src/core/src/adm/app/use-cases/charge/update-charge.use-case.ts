import { ChargeRepository } from '../../../domain/repository';
import { RepositoryFactory } from '../../../domain/factory';
import { Charge } from '../../../domain/entities';
import { Broker, LoggerInterface, WinstonLogger } from '#shared/infra';
import { UpdateChargeInput, ChargeOutput, ChargeOutputMapper } from '../../dto';
import { UseCase } from '#shared/app';

export class UpdateChargeUseCase
  implements UseCase<UpdateChargeInput, ChargeOutput>
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

  async execute(input: UpdateChargeInput): Promise<ChargeOutput> {
    this.logger.info({ message: 'Start UpdateCharge Use Case' });
    const charge = new Charge({ name: input.name });
    await this.chargeRepository.update(charge);
    return ChargeOutputMapper.toOutput(charge);
  }
}
