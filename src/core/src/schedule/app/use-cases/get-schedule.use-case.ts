import { ScheduleRepository, RepositoryFactory } from '../../domain';
import { Broker } from '../../../shared/infra/';
import { ScheduleOutput, ScheduleOutputMapper } from '../dto';
import { UseCase } from '../../../shared/app';
import { LoggerInterface } from '../../../shared/infra/logger/logger.interface';

export class GetScheduleUseCase
  implements UseCase<{ id: string }, ScheduleOutput>
{
  scheduleRepository: ScheduleRepository;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
    readonly logger: LoggerInterface,
  ) {
    this.scheduleRepository = repositoryFactory.createScheduleRepository();
  }

  async execute(input: { id: string }): Promise<ScheduleOutput> {
    this.logger.info({ message: 'Start GetSchedule Use Case' });
    const schedule = await this.scheduleRepository.findById(input.id);
    return ScheduleOutputMapper.toOutput(schedule);
  }
}
