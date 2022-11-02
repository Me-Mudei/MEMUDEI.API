import { Schedule, ScheduleRepository, RepositoryFactory } from '../../domain';
import { Broker } from '../../../shared/infra/';
import {
  ScheduleOutput,
  ScheduleOutputMapper,
  UpdateScheduleInput,
} from '../dto';
import { UseCase } from '../../../shared/app';
import { LoggerInterface } from '../../../shared/infra/logger/logger.interface';

export class UpdateScheduleUseCase
  implements UseCase<UpdateScheduleInput, ScheduleOutput>
{
  scheduleRepository: ScheduleRepository;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
    readonly logger: LoggerInterface,
  ) {
    this.scheduleRepository = repositoryFactory.createScheduleRepository();
  }

  async execute(_input: UpdateScheduleInput): Promise<ScheduleOutput> {
    this.logger.info({ message: 'Start UpdateSchedule Use Case' });
    const schedule = new Schedule({});
    await this.scheduleRepository.update(schedule);
    return ScheduleOutputMapper.toOutput(schedule);
  }
}
